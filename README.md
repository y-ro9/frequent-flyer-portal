# End-to-End Frequent Flyer Portal

> **Ticket:** ENG-163087 · **Epic:** Core Infrastructure Overhaul · **Priority:** P1
> **Owner:** Yash Raj (PDIT-INT-1247) · **Reporter:** Amit Sharma

A production-ready frequent flyer management portal built to replace
manual paper + Excel workflows for airline floor staff. Designed for
**spotty internet**, **accessibility-first** operations, and **zero
data loss** through local persistence.

---

## ✨ Highlights

- **Offline-first** — state persists to `localStorage`; no backend, no
  API keys, no PII leakage.
- **Security** — all text inputs sanitized against XSS before entering
  React state.
- **Accessibility** — semantic HTML, ARIA labels, keyboard navigable,
  Lighthouse a11y target of **100**.
- **Resilience (Unhappy Paths)** —
  - Empty lists show a friendly *"No data found"* state, never a blank screen.
  - Async operations surface a visual loading indicator
    (`role="status"`, `aria-busy="true"`).
  - Malformed or missing form input blocks submission and highlights
    offending fields with `aria-invalid="true"` + red styling.
- **Telemetry** — simulated analytics pings on every primary action:
  `[Analytics] User interacted with End-to-End Frequent Flyer Portal: <event>`
- **Design System** — strict monochromatic palette, 8 / 16 / 32px
  spacing grid, no rogue hex values outside `:root`.

---

## 🧪 Quality Gates

| Check | Command | Status |
|---|---|---|
| Unit + integration tests | `npm run test:run` | **30 / 30 passing** |
| Lint (zero warnings) | `npm run lint` | ✅ clean |
| Production build | `npm run build` | ✅ `dist/` generated |
| Accessibility target | Lighthouse | ≥ 90 (target 100) |

Tests were written **before** implementation — see
[`PROMPTS.md`](./PROMPTS.md) for the full prompt traceability log
(TRD §Vibe Coding).

---

## 🛠️ Stack

- **React 18** — UI
- **Vite 5** — dev server + production bundler
- **Vitest** + **React Testing Library** — test suite
- **Plain CSS** with design tokens (no Tailwind / no rogue hex)
- **localStorage** — persistence layer (offline-first)

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Install

```bash
npm install
```

### Develop

```bash
npm run dev
# → http://localhost:5173
```

### Test

```bash
npm run test:run      # one-shot, CI-friendly
npm test              # watch mode
```

### Lint

```bash
npm run lint          # zero warnings enforced
```

### Build & Preview

```bash
npm run build         # → dist/
npm run preview       # serve dist/ on :4173
```

## 📁 Project Structure

```

frequent-flyer-portal/
├── PROMPTS.md              # Vibe coding / prompt traceability log
├── README.md
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── src/
│   ├── main.jsx            # entry point
│   ├── App.jsx             # portal shell (header + form + list)
│   ├── setupTests.js       # jsdom + localStorage polyfill
│   ├── components/
│   │   ├── EmptyState.jsx  # "No data found" (Unhappy Path)
│   │   ├── Loader.jsx      # accessible spinner (Unhappy Path)
│   │   ├── MemberForm.jsx  # validated + sanitized input (Unhappy Path)
│   │   ├── MemberList.jsx  # semantic table
│   │   └── SearchBar.jsx   # debounced search
│   ├── lib/
│   │   ├── sanitize.js     # XSS guard
│   │   ├── storage.js      # localStorage wrapper
│   │   └── telemetry.js    # [Analytics] console ping
│   ├── styles/
│   │   └── global.css      # monochromatic design tokens
│   └── __tests__/          # 10 test suites · 30 tests
```

## 🎯 Feature Checklist (vs. TRD)

### Happy Path

    ☑

    Clear portal interface with h1 and sectioned h2 layout
    ☑

    Immediate input feedback (controlled components, debounced search)
    ☑

    Consistent member data shape (id, name, email, ffNumber, tier)

### Unhappy Path

    ☑

    Empty list → EmptyState (role="status", "No data found")
    ☑

    Async / loading → Loader (role="status", aria-busy="true")
    ☑

    Invalid inputs → submission blocked + aria-invalid="true" + red outline

### Non-Functional

    ☑

    Accessibility: semantic HTML, labelled inputs, focus-visible outlines
    ☑

    Telemetry: [Analytics] ping on app_loaded, member_created,
    member_form_invalid, member_search
    ☑

    Security: XSS sanitization before state; no hardcoded secrets
    ☑

    Design: monochromatic tokens, 8/16/32px spacing, no rogue hex
    ☑

    prefers-reduced-motion respected

## 🔒 Security Notes

    No API keys, tokens, or PII are hardcoded anywhere in the source.

    All user text passes through sanitizeText() (strips <script>,
    strips HTML tags, escapes & < > " ', trims, caps at 200 chars)
    before being stored in React state or persisted to localStorage.

    localStorage writes are wrapped in try/catch to survive quota
    errors and private-browsing mode.


## ♿ Accessibility Notes

    Every interactive element has an accessible name (via visible label
    or aria-label).

    Exactly one <h1>; heading hierarchy is h1 → h2.

    All form inputs have <label htmlFor="…">.

    Error messages are associated with inputs via aria-describedby.

    Loading + empty states use role="status" + aria-live="polite".

    Full keyboard navigation with visible :focus-visible outlines.

## 📝 Prompt Traceability

The full sequence of AI prompts used to drive this build (TDD-first,
per the TRD's "Vibe Coding" workflow) is documented in
PROMPTS.md. This file is a required deliverable,
not an afterthought.

## 📦 Deliverables

    Repository: this repo

    Production artifact: dist/ (from npm run build)

    Tests: 30 passing across 10 suites

    Prompt log: PROMPTS.md

## 📄 License

Internal client deliverable — Prodesk IT capstone (Capstone 4).
Not for public distribution.
