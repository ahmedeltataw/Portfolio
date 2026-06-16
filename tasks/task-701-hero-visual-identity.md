<!-- status: pending -->
# Hero Visual Identity Refresh — signature feel + contrast fix

task_id: task-701
priority: 🔴 critical
scope: medium (3 files)
project: portfolio-2026

## 🎯 الهدف
إصلاح مشكلة "AI template feel" وملء الهوية البصرية الناقصة:
1. Force a real visual break in the hero so it no longer reads as a copied award-portfolio baseline
2. Improve the hero’s readability and contrast
3. Keep the portfolio "ready" for judging, not in broken state

---

## 1) Patch A — immediate hero visual contrast/identity

**When:**
- The hero currently gives an “off-white header on dark page” / low-contrast impression
- The main identity area needs stronger ownership and legibility

**Then:**
- Global theme becomes coherent again: header and body use the same dark palette basis
- The hero gets a stronger focal contrast so the name/subtitle read clearly
- The page stops looking like two unrelated systems stacked together

## 2) Patch B — signature-level restyle

**When:**
- The current split + arch setup is too close to existing award-portfolio references
- The site needs a recognizable visual twist without rebuilding everything

**Then:**
- One signature element becomes the dominant visual signal
- Typography or accent usage is adjusted to feel personal, not templated
- Animations remain lightweight so performance doesn’t regress

---

## Files to modify

| File | Action | Intent |
|------|--------|--------|
| `src/app/layout.tsx` | tune theme/body classes | header/body palette unity |
| `src/app/globals.css` | patch light/dark tokens + accents | contrast + identity |
| `src/components/sections/hero.tsx` | update hero composition + motion cues | stronger readability + signature twist |

---

## Expected edit behavior

- Theme tokens should stay reusable, not hardcoded color dumps
- Hero updates should improve legibility without removing the existing component structure
- No new heavy libs or images
- Keep the portfolio functional and “ready” after each patch

---

## Verification

- [ ] `npm run build` — 0 errors
- [ ] `npm run lint` — 0 warnings
- [ ] Visual check: hero contrast improved
- [ ] Visual check: homepage no longer feels like a copied template
