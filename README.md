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

## Old Next.js app

The previous Next.js/React app is in `_archive/` (src, public, package.json, etc.) if you need to refer to it.
