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
- Tests 113 passing · lint 0/0 · Prettier clean

## Pricing — do not change without asking

- `site_rate = marketRate × FIDELITY_RATIO` (1.006948 = Fidelity's +0.69% selling gap)
- No 3% buffer. Removed in `61a2bf4` — it stacked above the bank's selling rate.
- Fallback: live market → cached `marketRate` → `11.67886`, always × ratio
- The live Fidelity fetch is an observer only; warns at ≥0.5 pp drift
- $1,000/car markup is baked into `master-inventory.csv` (`Price_USD − CIF_USD = 1000`)

## Waiting on Israel

- [ ] Drop markup $1,000 → $550 (needs `build:master` then `build:data`). He said "wait first".
- [ ] Merge `preview/landing-merge` — not approved.
- [ ] Find banks with lower rates — on hold.

## Queued, paused until he answers questions

1. `git pull --ff-only` (picks up `a9addf1`, the 5 Nov rate)
2. Tests for the fallback chain: live fail → cached quote → anchor
3. `AGENTS.md` fallback wording is wrong — it says the chain uses the cached
   `fidelityLive` quote, but it actually uses the cached `marketRate`
4. Workflow hardening: sync `vehicles.json` on rate change (or move to
   render-time pricing); bump GitHub Actions versions
5. `VehicleCard` labels `Price_USD` (CIF + markup) as "CIF" — misleading,
   worse if the markup drops to $550

## Gotchas

- GitHub token cannot `workflow_dispatch` (403). Rely on the 6-hour cron, or
  push a temporary trigger. Vercel redeploys automatically on `master`.
- Node scripts are ESM. Data pipeline order is `build:master` → `build:data`.
- Changing the markup requires regenerating both the CSV and `vehicles.json`.

## Separate thread

- Blender brand sting: script `/tmp/opencode/izzy_sting.py`, video
  `~/Videos/izzy_sting_10s_720p.mp4`. Blender is not on `PATH`:
  `/home/israel/Downloads/blender-5.2.3-linux-x64/blender`. No system ffmpeg.
