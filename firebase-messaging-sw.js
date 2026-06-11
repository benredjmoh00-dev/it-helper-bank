/* Service worker for Firebase Cloud Messaging (web push).
   Shows a system notification when the app is closed or backgrounded. */
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyA5f_XXZOnW4G3MpEMuSDg1eHkNe2f19jw",
  authDomain: "it-help-bank.firebaseapp.com",
  projectId: "it-help-bank",
  messagingSenderId: "680952606061",
  appId: "1:680952606061:web:6a36533340e7def3463e64"
});

const messaging = firebase.messaging();

// Data-only messages wake the SW; we build the notification here.
messaging.onBackgroundMessage((payload) => {
  const d = (payload && payload.data) || {};
  self.registration.showNotification(d.title || "IT Helper Bank", {
    body: d.body || "",
    icon: "assets/logo.png",
    badge: "assets/logo.png",
    tag: d.tag || "ithb"
  });
});

// Focus/open the app when a notification is clicked.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ("focus" in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow("./");
    })
  );
});
