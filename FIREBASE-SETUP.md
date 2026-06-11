# Configuration Firebase (à faire une seule fois)

Version **sans SSO** : la connexion se fait par **prénom + code PIN**.
Firebase ne sert que de base de données partagée (comptes, virements, messages,
notifications). ⏱️ ~5 minutes.

---

## Étape 1 — Le projet (déjà fait ✅)

Projet `it-help-bank` déjà créé sur https://console.firebase.google.com/.
(Pas besoin de la section « Authentication » : on n'utilise pas le SSO.)

---

## Étape 2 — Créer la base de données

1. Menu de gauche → **Build → Firestore Database** → **« Create database »**.
2. Choisis **Start in production mode** → Next.
3. Région : une proche de toi (ex. `europe-west`) → **Enable**.
4. Onglet **Rules** → remplace tout par ceci puis **Publish** :

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

   > ⚠️ Ces règles sont **ouvertes** (pas de mot de passe serveur, car pas de SSO).
   > C'est volontaire pour une appli-blague entre collègues avec de l'argent
   > **fictif**. On pourra durcir plus tard si besoin.

---

## Étape 3 — Récupérer la config (à me coller)

1. Roue dentée ⚙ en haut à gauche → **Project settings**.
2. Onglet **General** → **Your apps** → clique l'icône Web **`</>`**.
3. Surnom : `it-helper-bank-web` → **Register app** (ne coche pas Hosting).
4. Copie le bloc `const firebaseConfig = { ... }` et **colle-le-moi dans le chat**.

   ```js
   const firebaseConfig = {
     apiKey: "AIza....",
     authDomain: "it-help-bank.firebaseapp.com",
     projectId: "it-help-bank",
     storageBucket: "it-help-bank.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abcdef"
   };
   ```

---

## Comment ça marche, côté utilisateur

- Chaque personne ouvre le site → entre son **prénom + un PIN à 4 chiffres**.
- 1ʳᵉ fois → son compte est créé (solde de départ 5 000 € + IBAN).
- Ensuite → même prénom + même PIN → elle retrouve son compte (sur n'importe
  quel appareil).
- Virements entre collègues, 🔔 notifications temps réel, et messages / 🆘
  demande d'aide fonctionnent entre tous les comptes.

---

Quand tu m'as **collé le bloc `firebaseConfig`** (et créé la base à l'étape 2),
je l'insère dans le code et je lance un serveur local pour qu'on teste. 🚀
