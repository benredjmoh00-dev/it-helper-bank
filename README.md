# IT Helper Bank 💙

A fintech-style joke web app to reward your favourite IT support hero. Fully
**static** — one HTML file, no server, no API key, **free to host anywhere**.

- `index.html` — the whole app (single file, no build step).
- The **"Suggest a message"** button picks a random funny thank-you note
  locally, in the browser. No network call, no cost.

---

## Run locally

Just **double-click `index.html`** — it opens in your browser and everything
works, including the message suggester.

---

## Deploy for free (pick one)

Because it's pure static, any of these free hosts work in minutes:

### Netlify Drop (easiest, no account commands)
1. Go to https://app.netlify.com/drop
2. Drag the **`it-helper-bank` folder** onto the page.
3. You instantly get a public `https://....netlify.app` link to share. Done.

### GitHub Pages
1. Push this folder to a new GitHub repo.
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → `main` / root.
3. Wait ~1 min → your site is live at `https://<user>.github.io/<repo>/`.

### Vercel
1. `npm i -g vercel` then `vercel login`.
2. From this folder: `vercel` → accept defaults → preview URL.
3. `vercel --prod` → final public URL.

No environment variables, no secrets — nothing to configure. 🎉

---

## Want to change the messages?

Open `index.html`, find `MESSAGE_TEMPLATES` near the bottom, and edit the list.
`{name}` is replaced with the recipient and `{reason}` with the transfer reason.

---

## Safety note

This is a **demo / joke** app. No real money moves. The "balance", transfer,
fraud checks, and Premium Subscription invoice are all simulated.
