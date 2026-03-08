# HomeClear UX/UI Audit — Summary

## Issues Found & Fixed

### 1. Typography inconsistencies
- **Headings:** Mixed use of `text-[#333333]`, `text-slate-800`, `text-slate-900`. Standardised to `text-slate-900` for primary and `page-title` (`.page-title` = `font-display text-2xl font-bold text-slate-900`) for page titles.
- **Section titles:** Inconsistent section headings; standardised with `.section-title` (`text-sm font-semibold uppercase tracking-wide text-slate-500`).
- **Body/captions:** Replaced `#888888` and ad‑hoc grays with semantic tokens: `text-slate-600` (secondary), `text-slate-500` (muted).
- **Labels:** Form labels now consistently use `text-sm font-medium text-slate-700`.

### 2. Buttons — size, padding, alignment
- **Primary:** Inconsistent padding (`px-4 py-2`, `px-5 py-2.5`, `px-6 py-3.5`) and font size (`text-sm` vs `text-base`). Standardised to:
  - **Default primary:** `.btn-primary` — `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium`
  - **Large (hero):** `.btn-primary-lg` — same with `px-6 py-3.5 text-base`
  - **Nav CTA:** `.btn-nav` — `px-4 py-2 text-sm`
- **Secondary/outline:** Standardised to `.btn-secondary` — `inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium`
- **Alignment:** All button classes use `inline-flex items-center justify-center` (and `gap-2` where there’s an icon) so label and icon align and vertical padding is consistent.
- **Demo/secondary form buttons:** Set to `rounded-xl py-2.5 text-sm font-medium` and `inline-flex items-center justify-center` for consistency with other buttons.

### 3. Form inputs
- **Radius:** Mixed `rounded-lg` and `rounded-xl`. Inputs standardised to `rounded-xl` to match buttons and cards.
- **Padding:** Mixed `py-2`, `py-2.5`, `py-3`. Standardised to `px-4 py-2.5 text-sm`.
- **Label spacing:** Mixed `mt-1` and `mt-2`. Standardised to `mt-1.5` between label and input.
- **Focus:** Inconsistent focus rings; standardised to `focus:border-accent focus:ring-1 focus:ring-accent/30`.

### 4. Spacing
- **Section margins:** Section headings and blocks use consistent spacing (e.g. `mb-4`, `mb-6`, `mb-10` where appropriate).
- **Button groups:** Form actions use `gap-3` or `gap-4` and `flex-wrap` for consistent spacing and wrapping.
- **Back links:** Standardised with `.back-link` for icon + text alignment and spacing.

### 5. Colour tokens
- Replaced raw hex (`#333333`, `#888888`) with Tailwind semantic colours: `slate-900`, `slate-600`, `slate-500`, `slate-700` so theming and contrast are consistent.
- Root layout body text set to `text-slate-900`.

### 6. Files updated
- **Design system:** `src/app/globals.css` — design tokens and component classes (`.btn-primary`, `.btn-primary-lg`, `.btn-secondary`, `.btn-nav`, `.page-title`, `.section-title`, `.back-link`).
- **Pages:** Marketing, login, signup, dashboard, start, dashboard/project/new, dashboard/project/[id], dashboard/project/[id]/add-selling, dashboard/property/[id], dashboard/property/[id]/edit, dashboard/property/new, settings.
- **Components:** header, hero-visual, property-card, user-menu, start-here-form, moving-essentials-section.
- **Layout:** `layout.tsx` body text colour.

---

## Remaining recommendations (optional)
- **Property new / add-document / address-input / postcode-lookup / mortgage-calculator:** Some inputs still use `rounded-lg` or `mt-1`; can be aligned to `rounded-xl`, `py-2.5`, `mt-1.5`, and accent focus in a follow-up pass.
- **Footer** (if used): Replace any remaining `#333333` / `#888888` with `slate-900` / `slate-600`.
- **Headers:** Some pages use `border-white/40 bg-white/90`, others `border-slate-100 bg-white/80`. Consider one canonical header style for all app shell pages.

---

## Design token reference (globals.css)
- **Buttons:** `.btn-primary`, `.btn-primary-lg`, `.btn-secondary`, `.btn-nav`
- **Typography:** `.page-title`, `.section-title`, `.back-link`
- **Inputs:** Prefer `rounded-xl px-4 py-2.5 text-sm` and `.input-focus` for focus state.
