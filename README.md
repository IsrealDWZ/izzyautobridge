# IzzyAutoBridge Ghana

A modern, responsive vehicle import platform for the Ghanaian market. Built with React 18, Vite 5, Tailwind CSS, and Zustand.

## Features

- **Vehicle Catalog** - Browse 169+ vehicles with images, specs, and pricing
- **Advanced Filtering** - Filter by brand, fuel type, body type, category, price range, and year
- **Category System** - Vehicles organized into EV, Hybrid, Fuel, Bus, Heavy, and Other (2-3 wheelers)
- **Comparison Tool** - Side-by-side vehicle comparison (max 2)
- **Favorites** - Save vehicles for later
- **WhatsApp Integration** - Direct inquiry via WhatsApp
- **EV Calculator** - Calculate fuel vs electric savings
- **Responsive Design** - Mobile-first, works on all devices
- **Dark/Light Mode** - Theme switching with persistence

## Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 3.4
- **State Management**: Zustand 5
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Virtualization**: React Window + react-virtualized-auto-sizer
- **Build**: Vite 5 with ES modules
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint 8 with React, JSX-a11y, Import plugins
- **Formatting**: Prettier 3

## Project Structure

```
izzyautobridge/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── vehicle/        # VehicleCard sub-components
│   │   ├── VehicleCard.jsx
│   │   ├── VehicleGrid.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── ConciergeForm.jsx
│   │   └── ...
│   ├── data/               # Static data (vehicles.json, exchange-rate.json)
│   ├── store/              # Zustand store (useAppStore)
│   ├── utils/              # Validation, constants, formatters
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
├── scripts/                # Build & data pipeline scripts
│   ├── build-master-catalog.js    # Master catalog generator
│   ├── generate-vehicles.js       # Vehicle data generator
│   ├── fetch-exchange-rate.js     # Live exchange rate fetcher
│   ├── harvest.js                 # Data source orchestrator
│   └── sources/                   # Individual data source harvesters
├── package.json
├── vite.config.js
├── eslint.config.js
├── tsconfig.json
└── vitest.config.js
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Testing

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Linting & Formatting

```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues
npm run format        # Format with Prettier
npm run format:check  # Check formatting
```

### Type Checking

```bash
npm run typecheck
```

## Data Pipeline

The project uses a sophisticated data pipeline to generate the vehicle catalog:

1. **Harvest** (`scripts/harvest.js`) - Collects data from 20+ CSV/XLSX sources
2. **Normalize** - Standardize all rows to unified schema
3. **Filter** - Keep only rows with complete details + price
4. **Deduplicate** - Remove duplicates by Make+Model+Year+Trim (priority: main-features > category > misc > XLSX)
5. **Categorize** - Assign EV/Hybrid/Fuel/Bus/Heavy/Other based on fuel type + body
6. **Price Rule** - Add $1,000 to CIF price, recompute GHS at live rate
6. **Export** - Write `src/data/master-inventory.csv` (dormant master catalog)
7. **Generate** (`scripts/generate-vehicles.js`) - Match images, emit `vehicles.json` (only vehicles with images)

### Exchange Rate

The USD/GHS exchange rate is fetched at build time from exchangerate-api.com with a 3% safety margin and cached to `src/data/exchange-rate.json`. The rate is inlined at build time.

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Vercel auto-detects Vite configuration
3. Environment variables (if needed):
   - `VITE_WHATSAPP_NUMBER` - WhatsApp number for inquiries
   - `VITE_USD_GHS_RATE` - Optional override for exchange rate

### Manual Build

```bash
npm run build
# Output in dist/
```

## Key Components

### VehicleCard
Main vehicle display card with image, specs, price, and actions. Composed of:
- `VehicleImage` - Image with status/category badges
- `VehicleSpecs` - Key specifications chips
- `VehiclePrice` - GHS/USD pricing with rate
- `VehicleActions` - Compare, Favorite, WhatsApp buttons

### VehicleGrid
Virtualized grid using `react-window` + `react-virtualized-auto-sizer` for smooth scrolling with 169+ vehicles.

### FilterSidebar
Collapsible sidebar with multi-select filters for brand, fuel, body, status, category, price, year.

### ConciergeForm
Vehicle request form with validation, submits via WhatsApp.

### EVCalculator
Interactive calculator comparing petrol vs electric running costs.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Full production build (fetch rate → build data → sitemap → vite build) |
| `npm run build:data` | Fetch rate + build image index + generate vehicles.json |
| `npm run fetch:rate` | Fetch live USD/GHS rate |
| `npm run build:master` | Generate master-inventory.csv (run manually) |
| `npm run build:sitemap` | Generate sitemap.xml |
| `npm run match:images` | Bulk match images to vehicles |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_WHATSAPP_NUMBER` | No | WhatsApp number (default: 233536225804) |

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details.

## Contact

IzzyAutoBridge Ghana - Direct China Vehicle Supply
WhatsApp: +233 53 622 5804