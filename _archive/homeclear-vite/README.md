# HomeClear (Vite + React)

Simple, fast version of HomeClear—no Next.js, no server. One HTML file, React in the browser.

## Quick start

```bash
cd homeclear-vite
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser. The dev server usually starts in a few seconds.

## What’s included

- **Start page** – “Thinking about moving?” with reason, postcode, property type, and name
- **Valuation** – Enter a postcode and click “Get valuation” for an estimated range
- **Mortgage calculator** – Purchase price, deposit, income, term, rate → loan amount, monthly payment, stamp duty
- **Start my move** – Creates a project and switches to the dashboard
- **Dashboard** – List of projects (in-memory for now)

## Scripts

- `npm run dev` – Start dev server (fast)
- `npm run build` – Build for production (output in `dist/`)
- `npm run preview` – Serve the production build locally

## Stack

- Vite 6
- React 18
- TypeScript
- Tailwind CSS

No Firebase, no Next.js, no server-side rendering—just React and Vite.
