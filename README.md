# IzzyAutoBridge Ghana — Vehicle Marketplace

Production-ready React + Vite + Tailwind + Framer Motion frontend for IzzyAutoBridge Ghana vehicle imports.

## Live Demo
Deployed on Vercel: `https://izzyautobridge.vercel.app` (after deployment)

## Features Implemented

| Feature | Component | Status |
|---------|-----------|--------|
| Hero section with scroll animations | `Hero.jsx` | ✅ |
| Stats row (live counts from data) | `StatsRow.jsx` | ✅ |
| Trust section (6 trust signals) | `TrustSection.jsx` | ✅ |
| Import process (4 steps) | `ProcessSection.jsx` | ✅ |
| Path comparison (Path 01 vs 02) | `ComparisonSection.jsx` | ✅ |
| EV Calculator (fuel savings) | `EVCalculator.jsx` | ✅ |
| Concierge request form | `ConciergeForm.jsx` | ✅ |
| Vehicle grid with filters | `VehicleGrid.jsx` + `FilterSidebar.jsx` | ✅ |
| Compare modal (max 2) | `CompareModal.jsx` | ✅ |
| Favorites drawer | `FavoritesDrawer.jsx` | ✅ |
| Floating WhatsApp | `FloatingWhatsApp.jsx` | ✅ |
| Dark/Light mode | Zustand store | ✅ |
| Error boundary | `main.jsx` | ✅ |

## Data

- **194 vehicles** from 6 CSV categories (Sedans, SUVs, Hatchbacks, MPVs, Pickups, Mini Cars)
- **33 brands**: Toyota, Changan, Jetour, Honda, Chery, BYD, Haval, Geely, XPeng, AVATR, etc.
- **5 body types**: SUV (118), Sedan (51), Hatchback (10), MPV (8), Pickup (7)
- **445 real images** fuzzy-matched from local assets
- **WhatsApp**: `233536225804` (configured in all components)

## Quick Start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # Production build to dist/
npm run preview      # Preview production build
```

## Build-Time Data Generation

```bash
npm run build:data   # Runs build-image-index.js + generate-vehicles.js
```

This:
1. Scans 1,300+ images from `images_carimages/` and `images_serpapi/`
2. Parses 6 CSV files from `TO UPLOAD FIRST/MAIN FEATURES SORTED/`
3. Fuzzy-matches images to vehicles (brand + model + variant)
4. Outputs `src/data/vehicles.json` + copies images to `public/vehicles/`
5. `vite build` bundles everything to `dist/`

## Deploy to Vercel

1. Push to GitHub (done)
2. Import repo in Vercel dashboard
3. Framework: **Vite** (auto-detected)
4. Build: `npm run build` | Output: `dist`
5. Deploy

SPA routing configured via `vercel.json`.

## Project Structure

```
src/
├── components/        # 14 UI components
├── store/useAppStore.js    # Zustand global state
├── data/vehicles.json      # Generated (194 vehicles)
└── App.jsx           # Main composition

scripts/
├── build-image-index.js    # Image discovery
├── generate-vehicles.js    # CSV → JSON + image matching
└── utils/
    ├── fuzzy-match.js      # Levenshtein matching
    └── csv-transform.js    # Row transformation

public/vehicles/      # 445 matched images (copied at build)
dist/                 # Production build output
```

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS (custom navy/gold/whatsapp theme)
- Framer Motion (animations)
- Zustand (state)
- Lucide React (icons)
- Fraunces + Inter fonts