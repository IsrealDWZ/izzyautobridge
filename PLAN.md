# izzyautobridge — Redesign Plan (parked) + Video Integration (active)

Status: plan approved 2026-10-01. Video integration is the "try first" task; full redesign phases follow.

## Direction (decided)
- **Light premium default** (Tesla restraint / Lucid structure) **with dark-mode toggle as first-class theme** (existing navy dark palette, tokenized).
- Body font: swap Inter → distinctive (candidate: Manrope; final pick at Checkpoint 1 with rendered samples). Fraunces display stays.
- Structure/IA unchanged (App.jsx section order).
- References: Lucid (structure), Bentley concept (restraint), FeuersteinCars (dealer/inventory patterns), Colorlib roundup (light grid layouts).

## Phase 0 — Unblock git auth (prerequisite for any push)
- [x] Leaked classic PAT `ghp_…GcPfI` revoked by user (was embedded in origin URL).
- [x] `git remote set-url origin https://github.com/IsrealDWZ/izzyautobridge.git`
- [x] Credential helper reading `$GITHUB_PERSONAL_ACCESS_TOKEN` (verified push:admin on repo) — token never stored in repo config.
- [x] Verify `git ls-remote origin`.
- [x] Verify `.env.local` stays git-ignored.
- [x] Commit pending `ai` package.json/lock + index.ts as separate `chore:` commit.
- [x] Create branch `redesign/light-refresh`.

## Video integration (ACTIVE — user's first request)
- Source: `~/Downloads/16-9.mp4` — 1280×720, ~4.2s, H.264, no audio, 5.0 MB, branded promo w/ text overlays + jitter.video watermark.
- **Placement: dedicated mid-page showcase band** (recommended slot: between TrustSection and ProcessSection) — NOT hero bg (video has its own headline + CTA text).
- [x] Copy to `public/media/izzy-promo.mp4`.
- [x] Re-encode 5.0 MB → 469 KB (h264 CRF30, no audio, faststart) + poster frame 56 KB.
- [x] New `ShowcaseVideo.jsx`: muted autoplay loop playsInline, preload=metadata, poster, pause/play control (WCAG 2.2.2) top-right, prefers-reduced-motion → no autoplay, `#showcase` anchor.
- [x] Wired between TrustSection and ProcessSection in App.jsx.
- [x] QA via headless Chrome: header + video frame + controls verified rendering; build ✅; tests 47/47 ✅; eslint clean ✅.
- Open: watermark decision (accept / re-export from Jitter paid) — user to confirm.

## Phase 1 — Install 4 skills
```
npx skills add vercel-labs/agent-skills --skill web-design-guidelines -a opencode -y
npx skills add wondelai/skills --skill refactoring-ui -a opencode -y      # confirm name via skills find
npx skills add keysjoao/laws-of-ux-skills -a opencode -y
npx skills add nextlevelbuilder/ui-ux-pro-max-skill -a opencode -y
```
Load `frontend-design` skill at Phase 2 start.

## Phase 2 — Token system → Checkpoint 1
- CSS variables in `:root` + `.dark`, mapped into tailwind.config.js (kill hardcoded hexes).
- Light: tinted off-white canvas, white surfaces, navy #1B2A4A ink, gold #D4A843 restrained accent, WhatsApp green only on WA button, tinted borders.
- Dark: existing navy-dark palette tokenized; border-based elevation.
- One spacing discipline, modular type scale (~1.25, clamp for display), one radius scale, shadow tokens (light) / borders (dark), motion durations 150/250/400ms + reduced-motion guard.
- Font swap (index.html Google Fonts link + tailwind + index.css). Default theme → light; toggle keeps working.
- Gate: build (`--outDir /tmp/izzy-build`) + 47/47 tests → commit.

## Phase 3 — Core surfaces → Checkpoint 2
Nav (fix always-`text-white` bug), hero (image + headline + 2 CTAs, Lucid pattern), global typography. Grayscale-first, color last. Commit.

## Phase 4 — Inventory engine → Checkpoint 3
VehicleCard, VehicleGrid, FilterSidebar, vehicle/* — scannable specs, price hierarchy, card WhatsApp CTA. Keep virtualization. Commit.

## Phase 5 — Remaining sections → Checkpoint 4
Stats, trust, process, comparison, EV calculator, concierge, footer, CompareModal, FavoritesDrawer, floating buttons. Commit.

## Phase 6 — Gates → merge → production
Build / tests / lint (existing ~15 style warnings tolerated per repo convention) / frontend-design rubric + web-design-guidelines audit (AA contrast, focus, semantics, reduced-motion) → push branch → Vercel preview → user review → merge to master → prod deploy → live verify (asset-hash check).

## Guardrails
- No effect-stacking (no gradient orbs / noise / background layers) — restraint is the brief.
- Path-scoped commits (`src/`, `index.html`, configs) — never `dist/` (locally corrupted; Vercel builds in cloud).
- Small commits; user reviews each checkpoint before continuing.
- After every push: verify Vercel commit status via API (it silently skipped a3828fe once).

## Out of scope / deferred
- AI Gateway 403 (needs user's credit card on Vercel) — re-run `node --env-file=.env.local --experimental-strip-types index.ts` after card added.
- `dist/` filesystem corruption — `ntfsfix`/`chkdsk` someday.
- Fine-grained PAT expiry — user to check date in GitHub settings.

## Status log
- 2026-10-01: plan written; video analyzed (branded promo, watermark, placement = showcase band); mode → build.
