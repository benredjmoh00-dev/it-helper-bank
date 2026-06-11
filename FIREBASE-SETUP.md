# Configuration Firebase (à faire une seule fois)

Ce guide te fait créer le « cerveau » gratuit de l'app : comptes, virements,
messages et notifications. Suis les étapes dans l'ordre. ⏱️ ~10 minutes.

---

## Étape 1 — Créer le projet Firebase

1. Va sur https://console.firebase.google.com/ et connecte-toi avec ton compte Google.
2. Clique **« Créer un projet »** (Add project).
3. Nom : `it-helper-bank` → Continuer.
4. Google Analytics : tu peux **désactiver** (pas nécessaire) → Créer le projet.

---

## Étape 2 — Activer les connexions (SSO)

1. Menu de gauche → **Build → Authentication** → bouton **« Get started »**.
2. Onglet **Sign-in method** → **Add new provider**.
3. Active **Google** : clique dessus → bascule **Enable** → choisis ton email
   d'assistance → **Save**.
4. (Plus tard, optionnel) **Microsoft** : nécessite une inscription côté Azure.
   On le fera dans un second temps — commence avec Google seul.

---

## Étape 3 — Créer la base de données

1. Menu de gauche → **Build → Firestore Database** → **« Create database »**.
2. Choisis **Start in production mode** → Next.
3. Région : prends une proche de toi (ex. `europe-west`) → **Enable**.
4. Onglet **Rules** → colle ceci puis **Publish** (règles simples pour un
   prototype entre collègues — chaque personne connectée peut lire l'annuaire
   et n'écrire que ses propres données / notifications) :

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid} {
         allow read: if request.auth != null;
         allow write: if request.auth != null;
       }
       match /transfers/{id} {
         allow read: if request.auth != null &&
           (resource.data.fromUid == request.auth.uid || resource.data.toUid == request.auth.uid);
         allow create: if request.auth != null && request.resource.data.fromUid == request.auth.uid;
       }
       match /messages/{id} {
         allow read: if request.auth != null &&
           (resource.data.fromUid == request.auth.uid || resource.data.toUid == request.auth.uid);
         allow create: if request.auth != null && request.resource.data.fromUid == request.auth.uid;
       }
       match /notifications/{uid}/items/{id} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
         allow create: if request.auth != null;
       }
     }
   }
   ```

---

## Étape 4 — Récupérer la config (à me coller)

1. En haut à gauche, clique la **roue dentée ⚙ → Project settings**.
2. Onglet **General** → descends jusqu'à **Your apps** → clique l'icône **Web `</>`**.
3. Surnom : `it-helper-bank-web` → **Register app** (ne coche pas Hosting).
4. Firebase affiche un bloc `const firebaseConfig = { ... }`.
   **Copie tout ce bloc et colle-le-moi dans le chat.** Il ressemble à :

   ```js
   const firebaseConfig = {
     apiKey: "AIza....",
     authDomain: "it-helper-bank.firebaseapp.com",
     projectId: "it-helper-bank",
     storageBucket: "it-helper-bank.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef"
   };
   ```

   > ⚠️ Ces valeurs sont **publiques** par conception (elles vivent dans la page).
   > La sécurité vient des **règles Firestore** de l'étape 3, pas du secret.

---

## Étape 5 — Autoriser ton site (après déploiement)

Quand le site sera en ligne (GitHub Pages / Netlify), reviens dans
**Authentication → Settings → Authorized domains** et ajoute le domaine
(ex. `ton-user.github.io`). En local, `localhost` est déjà autorisé.

---

Quand tu as fait les étapes 1 à 4, **colle-moi le bloc `firebaseConfig`** et je
branche tout le reste (comptes, virements, messages, notifications). 🚀
