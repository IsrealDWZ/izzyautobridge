# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Virtualized VehicleGrid using react-window + react-virtualized-auto-sizer
- VehicleCard sub-components: VehicleImage, VehiclePrice, VehicleActions, VehicleSpecs
- Live exchange rate fetching with 3% safety margin (exchangerate-api.com)
- Master catalog pipeline (219 vehicles from 20+ sources)
- Category system: EV, Hybrid, Fuel, Bus, Heavy, Other (2-3 wheelers)
- Price rule: CIF + $1,000 with GHS recomputed at live rate
- Dynamic hero subtitle (no hardcoded vehicle count)
- Category filter chips in VehicleGrid
- Exchange rate caching with 3% safety margin
- AGENTS.md for AI assistant context
- Comprehensive README.md

### Changed
- **BREAKING**: VehicleCard refactored into sub-components
- **BREAKING**: Exchange rate now fetched at build time (was hardcoded 15.5)
- **BREAKING**: Store no longer manipulates DOM (theme toggle moved to App.jsx useEffect)
- **BREAKING**: VehicleGrid now uses virtualized rendering (react-window)
- Exchange rate now includes 3% safety margin (was hardcoded 15.5)
- Hero subtitle no longer shows vehicle count
- Removed "Path 02: Fly & Pick" from ConciergeForm and Footer
- Removed 12-month warranty mention from hero
- Store `toggleTheme` now only updates state (DOM sync in App.jsx useEffect)
- Exchange rate cached to `src/data/exchange-rate.json` with metadata
- VehicleCard now composed of VehicleImage, VehiclePrice, VehicleActions, VehicleSpecs
- VehicleGrid uses FixedSizeGrid + AutoSizer for virtualization
- Category filter chips added to VehicleGrid
- VehicleGrid uses AutoSizer for responsive column count

### Fixed
- Lint errors (14 → 0) - import order, unused vars, import/no-unresolved
- Image display bug - validateImageUrl now accepts `/vehicles/` relative paths
- VehicleCard image onError accessibility (eslint-disable comment)
- FilterSidebar useMemo dependency warnings (vehicles → _vehicles)
- Store theme toggle DOM manipulation moved to useEffect
- Test failures after store refactor
- VehicleCard import order warnings
- Unused variable warnings across components

### Security
- Added CSP headers via vite.config.js server headers
- Removed hardcoded GitHub PAT from shell history (revoked)
- WhatsApp links use `rel="noreferrer"`
- Input validation hardened (sanitizeFormInput, validateImageUrl)

### Performance
- VehicleGrid virtualization for 169+ vehicles
- Exchange rate cached at build (no runtime fetch)
- Image index caching in generate-vehicles.js
- Vite chunk splitting (vendor, motion, icons)

## [0.1.0] - 2026-09-07

### Added
- Initial release
- Vehicle catalog with 194 vehicles
- Filtering by brand, fuel, body, status, price, year
- Vehicle comparison (max 2)
- Favorites system
- WhatsApp integration
- EV savings calculator
- Concierge request form
- Dark/Light theme with persistence
- Responsive design (mobile-first)
- Framer Motion animations
- Tailwind CSS styling
- ESLint + Prettier + Vitest setup

### Security
- Input validation and sanitization
- WhatsApp number validation
- Image URL validation (allowed domains only)
- Price/year range validation

## Migration Guide

### From 0.1.0 to 0.2.0 (Unreleased)

#### Exchange Rate
Old: Hardcoded `15.5` in `src/utils/constants.js` and `scripts/generate-vehicles.js`
New: Fetched at build from exchangerate-api.com, cached to `src/data/exchange-rate.json`

```bash
# To update rate manually
npm run fetch:rate
npm run build
```

#### VehicleCard Composition
Old: Single `VehicleCard.jsx` with all logic inline
New: Composed of `VehicleImage`, `VehiclePrice`, `VehicleActions`, `VehicleSpecs`

```jsx
// Old
import VehicleCard from './VehicleCard';

// New (same import, but internal structure changed)
import VehicleCard from './VehicleCard';
// Sub-components available at:
import { VehicleImage, VehiclePrice, VehicleActions, VehicleSpecs } from './components/vehicle';
```

#### Theme Toggle
Old: Store directly manipulated `document.documentElement.classList`
New: Store only manages state; App.jsx useEffect syncs DOM

```jsx
// In App.jsx
useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}, [theme]);
```

#### VehicleGrid Virtualization
Old: Simple grid rendering all vehicles
New: Virtualized with FixedSizeGrid + AutoSizer

```jsx
// Automatically handles 169+ vehicles smoothly
import { Grid as FixedSizeGrid } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer';
```

#### Category System
New categories: `EV`, `Hybrid`, `Fuel`, `Bus`, `Heavy`, `Other`
Old: Only body types (SUV, Sedan, etc.)

```jsx
// Filter by category
filters.category = ['EV', 'Hybrid'];
```

## Deployment Notes

### Vercel Auto-Deploy
- Push to `master` → Vercel auto-deploys
- Build command: `npm run build`
- Output directory: `dist/`

### Environment Variables
```bash
VITE_WHATSAPP_NUMBER=233536225804  # Optional override
```

### Build-Time Rate Fetch
The build will fail if rate API is unreachable and no cached rate exists.
```bash
# Manual rate update
npm run fetch:rate
npm run build
```