# IzzyAutoBridge — Architecture Blueprint: CSV→JSON Build-Time Generation & Image Integration

## Patterns & Conventions Found

| Pattern | File:Line | Notes |
|---------|-----------|-------|
| Zustand store for global state | `src/store/useAppStore.js:6` | Theme, filters, compare, favorites |
| Vite + React + Tailwind | `package.json`, `vite.config.js` | Standard modern React stack |
| Component composition | `src/App.jsx:19-76` | All components imported and composed in App |
| Sample data structure | `src/data/vehicles.sample.json:1-53` | 14 fields per vehicle, matches component expectations |
| Image handling in VehicleCard | `src/components/VehicleCard.jsx:29-38` | Uses `Image_URLs` field, falls back to 🚗 emoji |
| WhatsApp link generation | `src/components/VehicleCard.jsx:13-15` | Template literal with encoded params |
| Build output | `dist/` folder | Static assets ready for Vercel |

## Architecture Decision

**Chosen Approach: Build-Time CSV→JSON Generation with Fuzzy Image Matching**

- **Why**: Simplest for static Vercel deployment; no runtime API needed; data updates on redeploy
- **Trade-off**: Inventory changes require rebuild/redeploy (acceptable for this use case)
- **Image Strategy**: Fuzzy match CSV Model/Brand to image filenames in `images_carimages/` and `images_serpapi/`; store matched paths in `Image_URLs` field; allow manual override later

## Component Design

### 1. Build Script: `scripts/generate-vehicles.js`
- **Responsibility**: Read all CSV files → transform to vehicle schema → fuzzy match images → write `src/data/vehicles.json`
- **Dependencies**: `csv-parse`, `fs`, `path`, `fast-glob` (for image discovery)
- **Interface**: CLI script run via `npm run build:data` (called in `build` script)

### 2. Image Index: `scripts/build-image-index.js`
- **Responsibility**: Scan `images_carimages/` and `images_serpapi/` → build lookup map: `brand_model_variant` → image path
- **Output**: JSON map used by generate-vehicles.js

### 3. Updated Vite Config: `vite.config.js`
- **Change**: Add `build:data` script to run before `vite build`

### 4. Data File: `src/data/vehicles.json` (generated, not committed)
- **Schema**: Matches `vehicles.sample.json` exactly (14 fields)
- **Source**: All CSV files in root + `TO UPLOAD FIRST/MAIN FEATURES SORTED/`

## CSV → Vehicle Schema Mapping

| CSV Column | Vehicle Field | Transform |
|------------|---------------|-----------|
| `Makes` + `Models` + `Years` | `ID` | `IZZY-${brand}-${model}-${year}`.replace(/\s+/g, '-').toUpperCase() |
| `Makes` | `Brand` | Direct |
| `Models` | `Model` | Direct |
| `Years` | `Year` | Parse int |
| `Trim / Edition` | `Variant` | Direct (fallback: empty) |
| `Fuel Types` | `Fuel_Type` | Direct |
| `Bodies` | `Body_Type` | Extract base type (e.g., "Sedan (Compact car)" → "Sedan") |
| `Drives` | `Drive` | Direct |
| `Exterior Colors` | `Color` | First color if multiple |
| `Conditions` | `Status` | Direct |
| `Mileage` | `Mileage_km` | Parse int (default 0) |
| `Price (CIF USD)` | `Price_USD` | Parse float, remove commas/asterisks |
| `Price_USD * 15.5` | `Price_GHS` | Calculated |
| `Engine` + `Transmission` + `Seats` + `Drive` | `Key_Specs` | `"${Engine} • ${Seats}-seater • ${Drive} • ${Transmission}"` |
| Fuzzy match | `Image_URLs` | Comma-separated matched image paths |

## Implementation Map

### Files to Create

1. `scripts/build-image-index.js` — Scan image folders, build searchable index
2. `scripts/generate-vehicles.js` — Main CSV→JSON conversion with image matching
3. `scripts/utils/fuzzy-match.js` — Reusable fuzzy matching logic
4. `scripts/utils/csv-transform.js` — CSV row → vehicle object transform

### Files to Modify

1. `package.json` — Add `build:data` script, add `csv-parse` and `fast-glob` deps
2. `vite.config.js` — Ensure build runs data generation first
3. `.gitignore` — Add `src/data/vehicles.json` (generated)
4. `src/App.jsx` — Import from `vehicles.json` instead of `vehicles.sample.json`

### Files to Keep (Reference)

- `src/data/vehicles.sample.json` — Keep as fallback/template

## Data Flow

```
CSV files (13 files) 
    ↓ [build-image-index.js]
Image Index Map (brand_model → [image paths])
    ↓ [generate-vehicles.js]
Parse all CSVs → Transform rows → Fuzzy match images → vehicles.json
    ↓ [vite build]
React App bundles with vehicles.json → dist/
    ↓ [Vercel deploy]
Live site
```

## Build Sequence

1. `npm install` — Install deps including `csv-parse`, `fast-glob`
2. `npm run build:data` — Run `scripts/generate-vehicles.js` → creates `src/data/vehicles.json`
3. `npm run build` — Vite builds production bundle to `dist/`
4. Deploy `dist/` to Vercel

## Critical Details

### Fuzzy Matching Algorithm
- Normalize: lowercase, remove spaces/special chars
- Match priority: exact model > brand+model > brand only
- Score: Levenshtein distance or simple substring match
- Return top N matches (use first for primary image)

### Error Handling
- Skip rows with missing required fields (Brand, Model, Year, Price)
- Log warnings for unmatched images
- Continue on individual row errors

### Image Paths in JSON
- Store as relative paths from `public/` or absolute URLs
- Since images are outside src, copy matched images to `public/images/` during build OR use absolute file:// paths (not web-safe)
- **Better**: Copy matched images to `public/vehicles/` during build, reference as `/vehicles/filename.webp`

### Vercel Deployment
- `vercel.json` for SPA routing if needed
- Build command: `npm run build`
- Output directory: `dist`

## Unresolved Blockers

- None — all decisions made, ready for implementation