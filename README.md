# HomeClear (static MVP)

HTML, CSS, and JavaScript only. No npm, no build step.

## Run it

- **Option 1:** Open `index.html` in your browser (double-click or File → Open).
- **Option 2:** From the project folder, run a static server, then open the URL it gives you:
  ```bash
  python3 -m http.server 8000
  ```
  Then visit [http://localhost:8000](http://localhost:8000).

## What’s in the app

- **Login** (`login.html`): Choose who you are from a dropdown (e.g. Mary Jane — Agent, John Doe — Solicitor). No password; this sets your view for the session. Opening the app without a session sends you here.
- **List** (`index.html`): One default deal (12 Elm Grove) and a “Create project” button. Created projects are stored in the browser (localStorage) You see **Agent view** or **Solicitor view** and your name + Sign out in the nav.
- **Deal detail** (`project.html?id=1` or `?id=2`): Address, sale price, agent and solicitor names, status, estimated completion. Sections for Tasks, Documents, and Messages (placeholders only).
- **New project** (`new-project.html`): Form for address, price, agent name, solicitor name, status, completion. Saves one extra project (id 2) and redirects back to the list.

MVP focuses on **agent** and **solicitor**; one property per project. Session is stored in the browser (sessionStorage) until you close the tab or sign out.

## Next.js app (Buyer/Seller simple view)

The **Buyer/Seller** “Instagram-style” page (Status, Completion, What you need to know) lives in the Next.js app.

**How to see it**

1. Run the Next app from the **`_archive`** folder:
   ```bash
   cd _archive && npm install && npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000), go to **Login**, sign in (sets a mock cookie).
3. Open **Dashboard** and click any property (e.g. “24 Oak Lane” or “7 Riverside Gardens”).

You’ll land on the **simple Buyer or Seller view** by default (big Status, Completion date, “What you need to know”). Use the **Buyer** / **Seller** / **Expert** tabs in the header to switch; **Expert** is the full detail view.

## Deploy on Vercel (CI/CD)

- **Auto-deploy:** Once the repo is connected to Vercel, every **push to `main`** triggers a new production deployment. No extra config needed.
- **Root directory:** In the Vercel project **Settings → General → Root Directory**, set **Root Directory** to **`_archive`** so Vercel builds the Next.js app. Leave **Framework Preset** as Next.js.
- **Deploy every 2 minutes:** A GitHub Action (`.github/workflows/deploy-vercel-schedule.yml`) triggers a Vercel deploy every 2 minutes via a **Deploy Hook**. To enable it:
  1. In Vercel: **Project → Settings → Git → Deploy Hooks**. Add a hook (e.g. “Every 2 min”), choose branch `main`, copy the URL.
  2. In GitHub: **Repo → Settings → Secrets and variables → Actions**. New repository secret: name **`VERCEL_DEPLOY_HOOK_URL`**, value = the deploy hook URL.
  3. Push to `main`; the scheduled workflow will run every 2 minutes and trigger a new deployment (you can also run it manually from the **Actions** tab).
- **CI:** GitHub Actions runs **lint** and **tests** on every push and pull request (see `.github/workflows/ci.yml`). Fix any failing checks before merging.

## Old Next.js app

The previous Next.js/React app is in `_archive/` (src, public, package.json, etc.) if you need to refer to it.
