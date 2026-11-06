# HANDOFF — current state

Rules live in `AGENTS.md`. This file is only live state and open threads.
Update it at the end of a session and delete anything finished. Keep it short.

**To resume:** open a chat in the workspace root and say
"Read `AGENTS.md` and `HANDOFF.md`, then continue."

## Snapshot

- Repo: `izzy-react/` (the parent folder is not a git repo)
- Branch: `master` — check `git status`; if behind, `git pull --ff-only` first
- Live: https://izzyautobridge.vercel.app
- Rate: **11.78** (market 11.698248 × 1.006948, refreshed 6 Nov 2026)
- Fidelity live: buy 11.45 / sell 11.785, as at 5 Nov 2026 (observed gap 0.81%)
- Catalog: 219 master rows → 129 published vehicles
- Tests 121 passing · lint 0/0 · Prettier clean
- Pricing is now render-time: `src/data/vehicles.js` + `src/utils/pricing.js`
  recompute `Price_GHS` from `Price_USD × USD_GHS_RATE` on import, so the
  6-hourly rate refresh updates displayed GHS prices on the next Vercel build
  with no manual `vehicles.json` regen. Decision made by Israel 6 Nov 2026.

## Pricing — do not change without asking

- `site_rate = marketRate × FIDELITY_RATIO` (1.006948 = Fidelity's +0.69% selling gap)
- No 3% buffer. Removed in `61a2bf4` — it stacked above the bank's selling rate.
- Fallback: live market → cached `marketRate` → `11.67886`, always × ratio
- The live Fidelity fetch is an observer only; warns at ≥0.5 pp drift
- $1,000/car markup is baked into `master-inventory.csv` (`Price_USD − CIF_USD = 1000`)

## Waiting on Israel

- [ ] Drop markup $1,000 → $550 (needs `build:master` then `build:data`.
  GHS prices now recompute at render time, but `Price_USD` still comes from
  the CSV, so both steps are still required once he says go.)
- [ ] Merge `preview/landing-merge` — not approved.
- [ ] Find banks with lower rates — on hold.

## Queued — all done 6 Nov 2026

1. ~~`git pull --ff-only`~~ — branch up to date (`a9addf1` already in).
2. ~~Fallback-chain tests~~ — `resolveMarketRate()` + 4 tests (117 total).
3. ~~`AGENTS.md` fallback wording~~ — corrected to live → cached `marketRate`
   → anchor sample; `fidelityLive` observational only.
4. ~~Workflow/vehicles.json sync~~ — resolved by switching to render-time
   pricing (above); action versions checked, checkout@v4 / setup-node@v4 are
   current, no bump needed.
5. ~~VehicleCard "CIF" label~~ — label dropped on Israel's call: the line now
   reads `$8,500 • 11.78 GHS/USD`. Terms/Trust "CIF Tema included" claims are
   untouched (those stay true regardless of the markup).

## Gotchas

- GitHub token cannot `workflow_dispatch` (403). Rely on the 6-hour cron, or
  push a temporary trigger. Vercel redeploys automatically on `master`.
- Node scripts are ESM. Data pipeline order is `build:master` → `build:data`.
- Changing the markup requires regenerating both the CSV and `vehicles.json`.

## Separate thread

- Blender brand sting: script `/tmp/opencode/izzy_sting.py`, video
  `~/Videos/izzy_sting_10s_720p.mp4`. Blender is not on `PATH`:
  `/home/israel/Downloads/blender-5.2.3-linux-x64/blender`. No system ffmpeg.
