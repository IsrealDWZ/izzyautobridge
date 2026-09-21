# AGENTS.md - Project Rules for AI Assistants

## Project Overview

**IzzyAutoBridge Ghana** - A vehicle import platform for the Ghanaian market.
- **Stack**: React 18 + Vite 5 + Tailwind CSS 3.4 + Zustand 5 + Framer Motion
- **Deployment**: Vercel (auto-deploy from GitHub `master`)
- **Live URL**: https://izzyautobridge.vercel.app

## Development Rules

### Code Style
- **ESM modules** (`"type": "module"` in package.json)
- **No `var`** - use `const`/`let`
- **Prefer `const`** over `let`
- **Strict TypeScript config** (strict: true, noUncheckedIndexedAccess: true)
- **JSDoc** for exported functions in `scripts/utils/`
- **ESLint + Prettier** - run `npm run lint` and `npm run format` before committing

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
npm run fetch:rate     # Fetch live USD/GHS rate (3% margin)
npm run build:master   # Generate master-inventory.csv (manual)
npm run build:sitemap  # Generate sitemap.xml
```

### Data Pipeline
```
1. harvest.js → 20+ CSV/XLSX sources
2. normalize-row.js → unified schema
3. Filter: details + price > 0
4. dedupe.js → Make+Model+Year+Trim (priority: main-features > category > misc > XLSX)
5. classify-category.js → EV/Hybrid/Fuel/Bus/Heavy/Other
6. Price: CIF + $1000 → GHS at live rate (cached)
7. master-inventory.csv (dormant master)
8. generate-vehicles.js → vehicles.json (only with images)
```

### Exchange Rate
- **Source**: exchangerate-api.com (open.er-api.com)
- **Cache**: `src/data/exchange-rate.json` (fetched at build)
- **Margin**: 3% safety buffer
- **Fallback**: 15.5 (cached → fallback)
- **Inlined** at build via `import rateData from '../data/exchange-rate.json'`

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Root component, theme provider |
| `src/main.jsx` | Entry point, ErrorBoundary |
| `src/store/useAppStore.js` | Zustand store (theme, filters, compare, favorites) |
| `src/components/VehicleCard.jsx` | Main vehicle display (composed) |
| `src/components/VehicleGrid.jsx` | Virtualized grid (react-window) |
| `src/components/FilterSidebar.jsx` | Filters with AutoSizer |
| `src/components/VehicleCard.jsx` | Main card (composed) |
| `src/components/vehicle/*.jsx` | Sub-components |
| `src/utils/validation.js` | All validators |
| `src/utils/constants.js` | USD_GHS_RATE, WHATSAPP_NUMBER, APP_CONFIG |
| `scripts/fetch-exchange-rate.js` | Live rate fetcher |
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
| `npm test` | Run tests (47 passing) |
| `npm run lint` | ESLint (0 errors, 0 warnings) |
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
- [ ] `npm test` passes (47/47)
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