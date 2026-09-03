# IzzyAutoBridge — React rebuild (starter)

This is a starting skeleton for rebuilding `izzy_inventory.py` as a real
frontend app (React + Vite + Tailwind + Framer Motion), following the
plan discussed with Claude. It is **not** feature-complete — it ports the
architecture and the highest-impact pieces (hero, vehicle grid/card,
compare, favorites, dark mode) so OpenCode has a real skeleton to build
from rather than starting from nothing.

## Run it

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` by default.

## What's already ported from the Streamlit app

- **State**: `src/store/useAppStore.js` replaces `st.session_state` —
  compare selection (capped at 2, same as the Streamlit version),
  favorites, theme, and filters all live here as instant client-side
  state instead of triggering a server rerun.
- **Vehicle card**: `src/components/VehicleCard.jsx` is the direct port
  of `vehicle_card()` — same three actions (Compare / Favorite /
  WhatsApp), same spec-chip and price-section layout, now real HTML
  instead of Streamlit-rendered widgets.
- **Compare modal**: `src/components/CompareModal.jsx` ports
  `render_compare_modal()` — opens automatically when 2 vehicles are
  selected, same price-difference banner, same spec table, same
  unconditional WhatsApp links (fixing the bug OpenCode found in the
  Streamlit version).
- **Favorites**: `src/components/FavoritesDrawer.jsx` ports
  `render_favorites_panel()` as a slide-in drawer instead of a sidebar
  block, including the "send list on WhatsApp" button.
- **Hero**: real photo + overlay (same Unsplash cargo-ship photo as the
  Streamlit version), a real display typeface (Fraunces, loaded in
  `index.html`) at proper scale, and a Framer Motion scroll-reveal —
  this addresses the "not premium enough" typography/animation gap
  from the design review.

## What's NOT done yet — real work for OpenCode

1. **Data**: `src/data/vehicles.sample.json` has 3 hand-written sample
   vehicles matching the CSV schema. Write a one-time script (Node or
   Python) to convert the real `Group_Sedans.csv` (all 70 vehicles,
   same 21 columns `load_and_transform()` used) into JSON at build
   time, or wire up a small API if live inventory updates without a
   redeploy matter.
2. **Filter sidebar/UI**: the store (`filters`) and the filtering logic
   in `VehicleGrid.jsx` exist, but there's no actual filter UI
   component yet (brand/fuel/body/status pills or a sidebar) — port
   `sidebar_filters()`'s logic into a real component.
3. **Trust section, stats row, process steps, EV calculator,
   concierge form**: not ported yet — only hero + grid + compare +
   favorites are done. Same component patterns apply.
4. **Real vehicle photography**: cards still fall back to the 🚗 emoji
   placeholder when `Image_URLs` is empty, exactly like the Streamlit
   version — getting real photos into the CSV/JSON is the single
   biggest visual upgrade available (see design review notes).
5. **WhatsApp number**: replace the `233XXXXXXXXX` placeholder in
   `App.jsx` with the real number.
6. **Deploy**: `npm run build` produces a static `dist/` folder —
   deployable to Vercel/Netlify/any static host. Decide whether the
   CSV→JSON step runs at build time (simplest) or you want a small
   backend for live inventory edits without redeploying.

## Design tokens

Colors/fonts are defined in `tailwind.config.js` (`navy`, `gold`,
`whatsapp`) and `index.html` (Fraunces + Inter fonts) — keep using
these Tailwind classes (`bg-navy`, `text-gold`, `font-display`) rather
than introducing new ad-hoc colors, so the site stays consistent as
more sections get built.
