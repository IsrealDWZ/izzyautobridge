# AGENTS.md - Project Rules for AI Assistants

## Project Overview

**IzzyAutoBridge Ghana** - A vehicle import platform for the Ghanaian market.
- **Stack**: React 18 + Vite 5 + Tailwind CSS 3.4 + Zustand 5 + Framer Motion
- **Deployment**: Vercel (auto-deploy from GitHub `master`)
- **Live URL**: https://izzyautobridge.vercel.app

### Routes

Cars are the priority on entry: the site root **is** the inventory.

| Path | Page | Notes |
|------|------|-------|
| `/` | `InventoryPage` | Home. Search, filters and the car grid come first; process + EV calculator sit below the grid. |
| `/inventory` | `InventoryPage` | Legacy alias of `/`; canonical points at `/`. Keep it working. |
| `/about` | `AboutPage` | Marketing page: hero, stats, trust, process, request form. |
| `/vehicle/:slug` | `VehicleDetailPage` | |
| `/compare` | `ComparePage` | |
| `/privacy`, `/terms` | | |

Prerendered static HTML is generated per route by `scripts/prerender-routes.js`
(Vercel serves `<route>/index.html`); a route missing from `STATIC_ROUTES`
falls through to `public/404.html`.

## Development Rules

### Code Style
- **ESM modules** (`"type": "module"` in package.json)
- **No `var`** - use `const`/`let`
- **Prefer `const`** over `let`
- **Strict TypeScript config** (strict: true, noUncheckedIndexedAccess: true)
- **JSDoc** for exported functions in `scripts/utils/`
- **ESLint + Prettier** - run `npm run lint` and `npm run format` before committing. Lint covers `src/` and `scripts/`; Prettier currently covers `src/` only.

### Import Order (ESLint enforced)
```
1. External packages (react, framer-motion, etc.)
2. Internal aliases (@/utils, @/components, @/store, @/data)
3. Relative imports (./components, ../utils)
```

### Component Patterns
- **Functional components** with hooks only
- **Named exports** for sub-components (VehicleImage, VehiclePrice, etc.)
- **Default export** for main component (VehicleCard)
- **Props destructuring** with defaults
- **Early returns** for guard clauses

### State Management (Zustand)
- **Pure state** in store - no side effects
- **Side effects** in components via `useEffect`
- **Selectors** for derived state (use `useAppStore(state => state.filters)`)
- **Actions** as pure functions returning new state

### Validation
- **Centralized** in `src/utils/validation.js`
- **Re-export** from `src/utils/constants.js` for rate
- **Test** all validators in `src/utils/__tests__/validation.test.js`

## Build & Deploy Pipeline

### Build Commands
```bash
npm run build          # Full: fetch:rate → build:data → sitemap → vite build
npm run build:data     # fetch:rate → build-image-index → generate-vehicles
npm run fetch:rate     # Fetch live USD/GHS pricing rate
npm run build:master   # Generate master-inventory.csv (manual)
npm run build:sitemap  # Generate sitemap.xml
```

### Data Pipeline
```
1. harvest.js → CSV sources (main features, category, misc)
2. normalize-row.js → unified schema
3. Filter: details + price > 0
4. dedupe.js → Make+Model+Year+Trim (priority: main-features > category > misc)
5. classify-category.js → EV/Hybrid/Fuel/Bus/Heavy/Other
6. Price: CIF + $1000 → GHS at live rate (cached)
7. master-inventory.csv (dormant master)
8. generate-vehicles.js → vehicles.json (only with images)
```

Mileage ranges such as `19,000-22,000 km` are parsed by `scripts/utils/parse-mileage.js`, which uses the upper bound so a listing never overstates condition.

### Exchange Rate
- **Formula**: `site_rate = marketRate × FIDELITY_RATIO`. The market rate comes from exchangerate-api.com; `FIDELITY_RATIO` is Fidelity's observed **selling gap** over the market rate (currently +0.69%: 11.76 / 11.67886 = 1.006948).
- **No extra buffer**: the gap already carries Fidelity's retail premium, so the old 3% safety margin was removed — it stacked on top and pushed prices above the bank's own selling rate.
- **Why the gap, not the absolute rate**: Fidelity's quote only updates once a day, so applying its absolute selling rate would freeze prices while the market moves. Applying the measured gap to the live market rate keeps prices responsive and still matches Fidelity's retail premium.
- **Live quote is observational**: `scripts/fidelity-rate.js` fetches Fidelity Bank Ghana's published USD buying/selling (plain HTTP first, then headless Chrome when the Sucuri challenge hides the table). `fidelityLive.observedRatio` records today's actual gap; the build warns when it drifts 0.5 percentage points or more from `FIDELITY_ANCHOR` so the constant can be re-measured.
- **Fallback chain**: cached `fidelityLive` quote (for the observed gap) → stored anchor ratio → `11.67886` market fallback. Pricing never depends on the live fetch succeeding.
- **Cache**: `src/data/exchange-rate.json` records `rate`, `marketRate`, `fidelityLive` (buying/selling/asAt/via/fetchedAt/observedRatio/marketRateAtFetch), the anchor sample and the ratio. It is rewritten only when the rounded rate or the Fidelity quote changes.
- **Refresh**: `.github/workflows/refresh-exchange-rate.yml` runs every 6 hours with `FIDELITY_FORCE=1`, commits the new rate when it changes, and lets Vercel redeploy. If a `VERCEL_DEPLOY_HOOK_URL` repo secret exists, it triggers a rebuild even when the rate is unchanged. Builds outside CI reuse a quote younger than 24 hours instead of re-rendering the bank page.
- **Inlined** at build via `import rateData from '../data/exchange-rate.json'`

### Analytics

- **GA4** `G-REGLS30J5B`, loaded in `index.html` with Consent Mode v2 defaulting to denied; `ConsentBanner` updates consent.
- **Vercel Web Analytics** via `@vercel/analytics` (`<Analytics />` in `App.jsx`) — cookieless, so visitors who decline GA4 still count. It must be enabled in the Vercel project's Analytics tab, otherwise the script 404s silently.
- **Helpers** live in `src/utils/analytics.js`: `trackEvent`, `trackPageView`, `trackWhatsApp`, `toItem`. Every helper no-ops when `window.gtag` is absent, so callers never guard.
- **Events**: `page_view` (explicit on SPA navigation), `search`, `filter_apply`, `view_item`, `select_item`, `add_to_wishlist` / `remove_from_wishlist`, `compare_add` / `compare_remove`, `whatsapp_click`, `generate_lead`, `ev_calculator_use`.
- **Key events** are configured in the GA4 admin UI (Admin → Events), not in code: mark `whatsapp_click` and `generate_lead`.
- **Rule**: track through the helper, never call `window.gtag` directly from a component.

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Root component, theme provider |
| `src/main.jsx` | Entry point, ErrorBoundary |
| `src/store/useAppStore.js` | Zustand store (theme, filters, compare, favorites) |
| `src/components/VehicleCard.jsx` | Main vehicle display (composed) |
| `src/components/VehicleGrid.jsx` | Vehicle grid with category chips and filtered cards |
| `src/components/FilterSidebar.jsx` | Filters: brand/fuel/body/status + price/year ranges |
| `src/components/VehicleCard.jsx` | Main card (composed) |
| `src/components/vehicle/*.jsx` | Sub-components |
| `src/utils/validation.js` | All validators |
| `src/utils/constants.js` | USD_GHS_RATE, WHATSAPP_NUMBER, APP_CONFIG |
| `scripts/fetch-exchange-rate.js` | Rate orchestrator (Fidelity live → cache → anchor) |
| `scripts/fidelity-rate.js` | Fidelity published-rate fetcher/parser (HTTP + headless Chrome) |
| `.github/workflows/refresh-exchange-rate.yml` | 6-hourly rate refresh + Vercel rebuild |
| `scripts/build-master-catalog.js` | Master CSV generator |
| `scripts/generate-vehicles.js` | vehicles.json generator |
| `src/data/master-inventory.csv` | Dormant master catalog (219 vehicles) |
| `src/data/vehicles.json` | Published vehicles (169 with images) |
| `src/data/exchange-rate.json` | Cached rate + metadata |

## Commands Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (port 5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview dist/ |
| `npm test` | Run tests (113 passing) |
| `npm run lint` | ESLint over src + scripts (0 errors, 0 warnings) |
| `npm run lint:fix` | Auto-fix |
| `npm run format` | Prettier format |
| `npm run typecheck` | TypeScript check |
| `npm run fetch:rate` | Fetch live exchange rate |
| `npm run build:master` | Generate master-inventory.csv |

## Git Workflow

### Branches
- `master` - Production (deployed to Vercel)
- `fix/ci-fixes` - Current feature branch

### Commit Messages
```
<type>: <description>

<details if needed>
```
Types: `fix`, `feat`, `chore`, `refactor`, `docs`, `test`, `style`, `perf`

### Pre-push Checklist
- [ ] `npm run lint` passes (0 errors, 0 warnings)
- [ ] `npm test` passes (113/113)
- [ ] `npm run build` succeeds
- [ ] No console.log in production code

## Security

- **No secrets in code** - Use env vars for secrets
- **Rate API** - No auth needed (public API)
- **WhatsApp links** - `rel="noreferrer"` on all external links
- **XSS prevention** - `validateImageUrl`, `sanitizeFormInput`, `sanitizeWhatsAppMessage`
- **CSP** - Configured via Vercel headers (nosniff, frame-deny, XSS-protection)

## Known Issues / TODO

- [ ] Add React Testing Library component tests
- [ ] Raise coverage thresholds to 70%
- [ ] Add virtualization to VehicleGrid (done)
- [ ] Extract more VehicleCard sub-components (done)
- [ ] Move WhatsApp number to env var
- [ ] Add CSP headers via Vercel config
- [ ] Add README.md, CHANGELOG.md
- [ ] Configure Dependabot/Renovate

## Debugging Tips

### Dev Server
```bash
npm run dev  # Port 5173
```

### Build Debug
```bash
npm run build:data  # Debug data pipeline
npm run fetch:rate  # Check rate fetch
```

### Lint Fix
```bash
npm run lint:fix  # Auto-fix most issues
```

### Cache Issues
```bash
rm -rf node_modules dist .vite
npm install
npm run dev
```