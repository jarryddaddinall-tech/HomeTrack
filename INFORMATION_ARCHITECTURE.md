# HomeClear Information Architecture

## Nucleus: Problem → Project → Properties

Everything starts with a **problem** (why they want to move), which becomes a **project**, which links to **properties** (1 if buying-only, 2 if selling + buying). Sub-elements (valuation, mortgage, solicitors, agents, documents, shortlist, moving essentials) attach to properties or the project.

## Three stages of value

| Stage | Focus | Sub-elements |
|-------|-------|--------------|
| **1. Understand the start** | "Should I move? What can I afford?" | Valuation, mortgage, shortlist |
| **2. The transaction** | "Where am I? What's next?" | Agents, solicitors, documents, stages |
| **3. Moving essentials** | "Am I ready to move in?" | Removals, utilities, packing, change of address |

## Route structure

| Route | Access | Purpose |
|-------|-------|---------|
| `/` | Public | Marketing homepage — hero, "Thinking about moving? Start here" |
| `/start` | Public | Entry point — problem capture, valuation, mortgage calculator. No signup required. |
| `/login` | Public | Log in form; Demo option → redirects to dashboard |
| `/signup` | Public | Sign up form; Demo option → redirects to dashboard. Accepts `from=start` + problem params to create project after signup. |
| `/register` | Public | Redirects to `/signup` (alias) |
| `/dashboard` | Auth required | Main app — projects, properties, reminders |
| `/dashboard/project/new` | Auth required | Create project — captures problem (reason, postcode, propertyType) |
| `/dashboard/project/[id]` | Auth required | Project detail — selling, buying, shortlist, moving essentials |
| `/dashboard/project/[id]/add-selling` | Auth required | Add selling property via postcode lookup |
| `/dashboard/property/[id]` | Auth required | Property detail — valuation (selling), mortgage (buying), stages, documents |
| `/dashboard/property/[id]/edit` | Auth required | Edit property |

## User flows

### Unauthenticated
- **Homepage** → "Thinking about moving? Start here" → `/start`
- **/start** → Valuation + mortgage (no signup) → "Create your move" → Sign up → Project created with problem data
- **Homepage** → Log in → Dashboard

### Authenticated
- **Dashboard** → "Thinking about moving? Start here" → `/start` (or "Start a move" → project/new)
- **/start** → "Start my move" → Project created → Project detail
- **Project detail** → Add selling → Add buying → Shortlist → Moving essentials
- **Property detail** → Valuation (selling), Mortgage calculator (buying), stages, documents
- **Any** → Log out → Homepage

## Design decisions

1. **Start at the problem** — Entry point is `/start` where users capture why they're moving. No signup required for initial value (valuation, mortgage).
2. **Problem → Project** — Project model includes `reason`, `postcode`, `propertyType` from the problem.
3. **Single entry to app** — Login and Signup both lead to dashboard. Demo login skips auth for testing.
4. **/register → /signup** — Keeps one canonical signup URL.
5. **Moving essentials** — Project-level sub-elements (removals, utilities, packing, change of address) for Stage 3.
