/* Cloud Function: when a notification document is created for a user,
   send a web push to all that user's registered devices (FCM tokens). */
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();

exports.pushOnNotify = onDocumentCreated("notifications/{uid}/items/{id}", async (event) => {
  const snap = event.data;
  if (!snap) return;
  const n = snap.data() || {};
  const uid = event.params.uid;

  const userRef = getFirestore().doc(`users/${uid}`);
  const userSnap = await userRef.get();
  const tokens = (userSnap.exists && userSnap.data().fcmTokens) || [];
  if (!tokens.length) return;

  const res = await getMessaging().sendEachForMulticast({
    tokens,
    data: {
      title: String(n.title || "IT Helper Bank"),
      body: String(n.body || "")
    }
  });

  // Remove tokens that are no longer valid.
  const stale = [];
  res.responses.forEach((r, i) => {
    if (!r.success) {
      const code = r.error && r.error.code ? r.error.code : "";
      if (code.includes("registration-token-not-registered") || code.includes("invalid-argument")) {
        stale.push(tokens[i]);
      }
    }
  });
  if (stale.length) {
    await userRef.update({ fcmTokens: FieldValue.arrayRemove(...stale) });
  }
});
