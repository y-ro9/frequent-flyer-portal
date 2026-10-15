# PROMPTS.md — Vibe Coding Log

**Ticket:** ENG-163087 — End-to-End Frequent Flyer Portal
**Owner:** Yash Raj (PDIT-INT-1247)
**Workflow:** TDD via AI (TRD §Vibe Coding)

---

## Phase 0 — Plan

**P1.** "Read the TRD, list Happy Path stories, Unhappy Path edge cases, NFRs, and DoD. No code."
→ AI confirmed scope: FFP portal, offline-first, XSS sanitize, a11y 100, telemetry pings, monochrome design, no API keys.

**P2.** "Recommend a stack for 'Final Polish (Capstone 4)' — must support build artifacts, Lighthouse, unit tests, offline."
→ React + Vite + Vitest + React Testing Library + plain CSS tokens. No backend; `localStorage` only.

---

## Phase 1 — Write Tests First (TRD Step 1)

**P3.** "Write the Vitest + RTL test suite FIRST (no implementation). Cover: sanitizeText (XSS), trackEvent (`[Analytics]` prefix), storage (empty / round-trip / corrupt JSON), EmptyState, Loader, MemberForm (invalid + XSS + labels), SearchBar (label + debounced), MemberList (table / empty / loading), App integration, a11y contract."
→ 10 test suites generated. All fail on `npm run test:run` (`Failed to resolve import`) — red state confirmed.

**P4.** "SearchBar test uses userEvent v14 + fake timers — patch with `advanceTimers` option."
→ Test patched.

---

## Phase 2 — Implement to Green (TRD Step 2)

**P5.** "Implement `src/lib/sanitize.js`, `telemetry.js`, `storage.js` to make lib tests pass."
→ 3 libs written. Unit tests pass.

**P6.** "Implement `EmptyState`, `Loader`, `MemberList` to match role/text contracts. MemberList must render Loader when loading, EmptyState when empty."
→ 3 components written. Renderer tests pass.

**P7.** "Implement `MemberForm` — controlled inputs, labels, validation (email regex, non-empty), `aria-invalid` on error, sanitize on submit, `trackEvent('member_created')`, `noValidate`."
→ Form tests pass.

**P8.** "Implement `SearchBar` — labelled input, 300ms debounce via `onSearchRef`, fire `member_search` only on non-empty."
→ Debounce test passes.

**P9.** "Implement `App` + `main.jsx`: lazy-load members from storage, persist on change, add/search handlers, single `<h1>`, sections with `aria-labelledby`, StrictMode."
→ Integration tests pass.

**P10.** "Write `global.css` — monochromatic tokens (8/16/32px), no hex outside `:root`, `:focus-visible` outlines, `prefers-reduced-motion`, `.visually-hidden`, 2-col form ≥640px."
→ Design system in place.

**P11 (iterative loop).** Pattern used when AI broke a path:
> "That approach caused <error>. Let's revert and try a different method."

**P12 (test-env hardening).** "Three failures: (1) Node 22+ experimental `localStorage` shadows jsdom → polyfill in `setupTests.js` guarded by runtime check. (2) MemberForm XSS test forgets to type FF number → fix test. (3) SearchBar debounce times out with fake timers → use `waitFor`."
→ 30/30 tests pass. Two fixes test-only, one env-only.

**P13 (lint + build).** "Run `npm run lint --max-warnings 0` and `npm run build`. Report issues; propose prompt-level remedies, do not hand-patch."
→ Zero warnings; `dist/` produced.

**P14 (Lighthouse).** "Serve `dist/` with `npm run preview`. List manual Lighthouse checks for Accessibility ≥ 90 (target 100) and Performance ≥ 90."
→ Audited.

---

## TRD → Evidence

| Requirement | Where |
|---|---|
| Empty states | `EmptyState.jsx`, MemberList test |
| Loading indicator | `Loader.jsx`, MemberList test |
| Invalid input blocked + red | `MemberForm.jsx`, form tests |
| a11y 100 target | `a11y.test.jsx`, semantic HTML |
| `[Analytics]` telemetry | `telemetry.js` + test |
| XSS sanitize before state | `sanitize.js` + test |
| Monochrome 16/32px | `global.css` tokens |
| No API keys / PII | Mock only, localStorage |
| `PROMPTS.md` at root | this file |
