# IzzyAutoBridge — "Nomad + Terracotta Energy" Design System

Single source of truth for design tokens. CSS custom properties live in
`src/index.css` (`:root` = light base, `.dark` = dark matrix); Tailwind
semantic colors in `tailwind.config.js` map to these exact variables.

## Light Mode Configuration (Default Base Layout)

| Token | Value | Role |
|---|---|---|
| `--bg-primary` | `#ebe9e7` | Alabaster Off-White (Global site background/canvas space) |
| `--bg-card` | `#ffffff` | Pure White (Floating dashboard containers, grid cards, data blocks) |
| `--bg-secondary` | `#4f3928` | Dark Chocolate (Primary navigation bars, app footers, control strips) |
| `--text-main` | `#3c2411` | Espresso Near-Black (All main h1/h2 headers, body reading text) |
| `--text-muted` | `#4f3928` | Dark Chocolate (Secondary metadata, item specs, table labels) |
| `--border-subtle` | `#c4bdb7` | Greige (Input field strokes, container borders, visual divider lines) |

## Dark Mode Matrix (Triggered via `class="dark"` or `data-theme="dark"` on the root HTML element)

| Token | Value | Role |
|---|---|---|
| `--bg-primary` | `#3c2411` | Espresso Near-Black (Global dark background canvas to mitigate eye strain) |
| `--bg-card` | `#4f3928` | Dark Chocolate (Elevated component layers floating over espresso canvas) |
| `--text-main` | `#ebe9e7` | Alabaster (Soft, radiant typography to prevent text halation/blurring) |
| `--text-muted` | `#c4bdb7` | Greige (Secondary text vectors, VIN labels, port data) |
| `--border-subtle` | `#8a7b70` | Taupe (Muted container boundaries that don't distract in the dark) |

## Global Interactive Accents (Constant values preserved across BOTH light and dark environments)

| Token | Value | Role |
|---|---|---|
| `--accent-action` | `#c86b45` | Terracotta (Primary call-to-actions, "Place Bid", billing submissions) |
| `--accent-alert` | `#b85329` | Burnt Amber/Rust (Live countdown clocks, urgency notifications, ticking timers) |
| `--accent-hover` | `#8a7b70` | Taupe (Interactive state transitions for links and secondary buttons) |

## Typographic Accessibility Rules (WCAG AA — minimum 4.5:1)

1. Every typographic asset must sustain a minimum contrast ratio of 4.5:1.
2. Primary text on light backgrounds exclusively uses `--text-main` (`#3c2411`).
3. Primary text on dark backgrounds exclusively uses `--text-main` (`#ebe9e7`).
4. **Forbidden combinations:**
   - ❌ `#8a7b70` (Taupe) text on a `#ebe9e7` (Alabaster) canvas
   - ❌ `#4f3928` (Dark Chocolate) text on a `#3c2411` (Espresso) dark-mode background
   - ❌ Pure white text on `#c4bdb7` (Greige) outlined components or badges

## Implementation Notes

- **Surfaces/text** flow through CSS variables (`bg-primary`, `bg-card`,
  `bg-secondary`, `text-main`, `text-muted`, `border-subtle`) so the
  `.dark` class remaps every component with no `dark:` duplication.
- **Accents are constant**, so their Tailwind entries are literal hex —
  this keeps Tailwind opacity modifiers (`bg-action/10`, `border-action/40`)
  working; var()-based tokens are used without alpha modifiers.
- **Text on `--bg-secondary` surfaces** (nav, footer, marquee strip,
  dark panels) uses `--text-inverse` (`#ebe9e7`, constant) — the light-mode
  value of `--text-main` would be espresso-on-chocolate and fails 4.5:1.
- **Primary CTAs** = `bg-action` + white label at ≥19px bold
  (WCAG "large text" threshold, 3:1 — white on `#c86b45` measures 3.72:1).
- **Small labels never sit on terracotta** (3.72:1 < 4.5) — badges/chips use
  `--bg-secondary`/espresso fills with alabaster text, or the fixed
  alabaster-on-espresso `.chip-badge`.
- **`--accent-hover` (taupe) never carries text** (fails 4.5:1 on both
  canvases) — it drives hover underlines, background tints, and icon
  states; link text transitions to `--text-main`/white instead.
- **Urgency text** uses `--accent-alert` (`#b85329`): 4.88:1 on white cards.
