# IzzyAutoBridge — "Browns Amortage Premium Minimal" Design System

Single source of truth for design tokens. CSS custom properties live in
`src/index.css` (`:root` = light base, `.dark` = dark matrix); Tailwind
semantic colors in `tailwind.config.js` map to these exact variables.

## Light Mode Configuration (Default Base Layout)

| Token | Value | Role |
|---|---|---|
| `--bg-primary` | `#e7e7e7` | Platinum Silk (Global app background canvas) |
| `--bg-card` | `#ffffff` | Pure White (Floating visual components & data blocks) |
| `--bg-secondary` | `#4f3928` | Dark Chocolate (Primary navigation bars, app footers, control strips) |
| `--text-main` | `#78635e` | Moccasin Brown (Primary typography & headers) — **AA-adjusted** from spec `#907771`, see audit rule 1 |
| `--text-muted` | `#74655a` | Driftwood (Secondary descriptive blocks) — **AA-adjusted** from spec `#afa298`, see audit rule 1 |
| `--border-subtle` | `#aca6a0` | Pebble Gray (Structural boundaries & clean divider lines) |
| `--accent-surface` | `#beb4ad` | Warm Sand (Deactivated states or pill tag backdrops) |

## Dark Mode Matrix (Triggered via `class="dark"` or `data-theme="dark"` on the root HTML element — UNCHANGED by the Browns Amortage refresh)

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
| `--accent-action` | `#907771` | Moccasin (Primary interactive UI trigger backgrounds, CTA fills, icon accents) |
| `--accent-alert` | `#b85329` | Burnt Amber/Rust (Live countdown clocks, urgency notifications, form validation errors) |
| `--accent-hover` | `#8a7b70` | Taupe (Interactive state transitions for links and secondary buttons) |
| `--accent-surface` | `#beb4ad` | Warm Sand (Deactivated states or pill tag backdrops — eyebrows, spec tags, inactive filter chips) |

## Typographic Visibility Rules (WCAG AA — minimum 4.5:1)

1. Every typographic asset must sustain a minimum contrast ratio of 4.5:1
   (large text: ≥18.66px bold / ≥24px regular may use the 3:1 threshold).
   The spec's literal text hexes cannot meet this on the spec's own
   backgrounds, so the two TEXT tokens are AA-adjusted to the lightest
   same-hue values that pass on the Platinum Silk canvas:

   | Pair | Spec value | Adjusted | Ratio |
   |---|---|---|---|
   | primary text on `#e7e7e7` canvas | `#907771` → **3.35:1** ✗ | `#78635e` | **4.53:1** ✓ |
   | secondary text on `#e7e7e7` canvas | `#afa298` → **2.01:1** ✗ | `#74655a` | **4.53:1** ✓ |
   | white label on `#907771` action fill | `#907771` | kept literal | 4.15:1 — passes the 3:1 large-text threshold only |

   All non-text spec hexes (`#e7e7e7`, `#ffffff`, `#aca6a0`, `#beb4ad`,
   `#907771`) are kept **exactly** as specified.
2. Primary text on light backgrounds exclusively uses `--text-main`.
3. Primary text on dark backgrounds exclusively uses `--text-main`
   (`#ebe9e7`); text on `--bg-secondary` chrome uses `--text-inverse`.
4. **Forbidden combinations:**
   - ❌ `#aca6a0` (Pebble Gray) text on the `#e7e7e7` (Platinum Silk) canvas — 1.95:1
   - ❌ `#beb4ad` (Warm Sand) text onto pure `#ffffff` containers — 2.03:1
   - ❌ `--text-main` (`#78635e`) as text ONTO `--accent-surface` (`#beb4ad`) — 2.75:1
     (pill labels use espresso `#3c2411` instead — 7.11:1)
   - ❌ `--accent-hover` (taupe) as a text color on any canvas (3.37:1 / 4.08:1)

## Implementation Notes

- **Surfaces/text** flow through CSS variables (`bg-primary`, `bg-card`,
  `bg-secondary`, `text-main`, `text-muted`, `border-subtle`) so the
  `.dark` class remaps every component with no `dark:` duplication.
- **Accents are constant**, so their Tailwind entries are literal hex —
  this keeps Tailwind opacity modifiers (`bg-action/10`, `border-action/40`)
  working; var()-based tokens are used without alpha modifiers.
- **Text on `--bg-secondary` surfaces** (nav, footer, marquee strip,
  dark panels) uses `--text-inverse` (`#ebe9e7`, constant).
- **Primary CTAs** = `bg-action` (`#907771`) + white label at ≥19px bold
  (WCAG large-text threshold 3:1 — white on `#907771` measures 4.15:1).
  Every white-on-action label in the codebase is `text-xl font-bold`.
- **Warm Sand pills** (`.chip-soft` eyebrows, spec tags, inactive filter/
  category chips, deactivated compare states) use `bg-accent-surface` with
  espresso `text-navy` (`#3c2411`) labels — 7.11:1.
- **Selected/active pills** keep `.pill-active` inversion
  (`--text-main` fill, `--bg-primary` label) — 4.53:1.
- **`--accent-hover` (taupe) never carries text** — hover underlines,
  background tints (`bg-accent-hover/15`), and icon states only.
- **Urgency text** uses `--accent-alert` (`#b85329`): 4.88:1 on white cards.
