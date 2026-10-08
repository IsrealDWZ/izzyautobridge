# IzzyAutoBridge — "Apple Premium Minimal" Design System

Single source of truth for design tokens. CSS custom properties live in
`src/index.css` (`:root` = light base, `.dark` = dark matrix); Tailwind
semantic colors in `tailwind.config.js` map to these exact variables.
Apple's monochromatic structure: soft canvas + white surfaces + high-contrast
text + **a single blue accent reserved for interactive elements**.

## Light Mode Configuration (Default Base Layout)

| Token | Value | Role |
|---|---|---|
| `--bg-primary` | `#f5f5f7` | Soft off-white canvas (60% of the layout) |
| `--bg-card` | `#ffffff` | Product cards, menus, grid containers (30%) |
| `--bg-secondary` | `#ffffff` | Nav strip, footer, marquee, badges |
| `--text-main` | `#1d1d1f` | Sharp headings and body copy (15.46:1 on canvas) |
| `--text-muted` | `#6e6e73` | Captions, subheadings, muted details (4.66:1 on canvas) |
| `--border-subtle` | `#d2d2d7` | Subtle lines and container outlines |
| `--accent-surface` | `#ffffff` | Pill/deactivated backdrops (= secondary canvas) |

## Dark Mode Matrix (Triggered via `class="dark"` — the site's manual toggle
carries the same values as `prefers-color-scheme: dark`)

| Token | Value | Role |
|---|---|---|
| `--bg-primary` | `#000000` | True black for contrast |
| `--bg-card` | `#1d1d1f` | Elevated surfaces |
| `--bg-secondary` | `#1d1d1f` | Nav/footer on black |
| `--text-main` | `#f5f5f7` | Off-white headings/body (19.29:1 on black) |
| `--text-muted` | `#86868b` | Captions and muted details (5.80:1 on black) |
| `--border-subtle` | `#424245` | Hairlines on dark surfaces |
| `--accent-surface` | `#1d1d1f` | Pill backdrops (= secondary canvas) |

## Interactive Accents & Derived Tokens

| Token | Light | Dark | Role |
|---|---|---|---|
| `--accent-action` / rgb triple | `#0071e3` | `#2997FF` | Links, primary buttons, chevrons — the **only** saturated color |
| `--accent-alert` | `#d70015` | `#ff6961` | Errors/urgency (Apple-accessible reds) |
| `--accent-hover` | `#6e6e73` | `#6e6e73` | Neutral gray transitions (never colored) |
| `--text-inverse` | `#1d1d1f` | `#f5f5f7` | Text on secondary surfaces (nav/footer) |
| `--text-inverse-muted` | `rgba(29,29,31,.75)` | `rgba(245,245,247,.75)` | 75% text on secondary (7.33:1 / 9.17:1) |

Accent colors are fed to Tailwind as `rgb(var(--accent-*-rgb) / <alpha-value>)`
so opacity modifiers (`bg-action/10`) work in both modes.

## Typography

System stack only — zero webfonts: `-apple-system, BlinkMacSystemFont,
"Segoe UI", Roboto, Helvetica, Arial, sans-serif`. Display headings use the
same stack with Apple-style tight tracking (`letter-spacing: -0.018em`).
Fraunces/Inter removed from `index.html`.

## The 3 Apple Rules as Implemented

1. **60-30-10** — `#f5f5f7` is the page canvas (60%); `#ffffff` is cards,
   nav, footer, badges (30%); `#0071e3`/`#2997FF` appears only on CTAs,
   links, icons, progress and focus rings (≤10%).
2. **Generous white space** — sections run `py-16`…`py-28` (64–112px) with
   `max-w-7xl` containers; cards keep 20–32px internal padding.
3. **Neutral grays for content** — no colorful section backgrounds.
   Segments alternate `#ffffff` cards on the `#f5f5f7` canvas; product
   photography supplies all color. Constant dark panels (`#1d1d1f`
   Comparison hero, EV results panel, black hero gradient) are Apple's
   black-promo-panel idiom and stay dark in both modes.

## Contrast Audit (all pairs script-verified)

| Pair | Ratio | Need | Verdict |
|---|---|---|---|
| `#1d1d1f` on canvas `#f5f5f7` | 15.46 | 4.5 | PASS |
| `#1d1d1f` on card `#ffffff` | 16.83 | 4.5 | PASS |
| muted `#6e6e73` on canvas / card | 4.66 / 5.07 | 4.5 | PASS |
| white on CTA `#0071e3` | 4.70 | 4.5 | PASS |
| link `#0071e3` on card | 4.70 | 4.5 | PASS |
| link `#0071e3` on canvas | 4.31 | 4.5 | **large/graphic contexts only** (icons, 24px bold numerals — no small blue text sits on the canvas) |
| alert `#d70015` on card / canvas | 5.38 / 4.94 | 4.5 | PASS |
| dark text `#1d1d1f` on WhatsApp green | 8.49 | 4.5 | PASS |
| active pill `#f5f5f7` on `#1d1d1f` | 15.46 | 4.5 | PASS |
| white on gray hover `#6e6e73` | 5.07 | 4.5 | PASS |
| heart `#ff3b30` on card (graphic) | 3.55 | 3.0 | PASS |
| dark text `#f5f5f7` on `#000` / `#1d1d1f` | 19.29 / 15.46 | 4.5 | PASS |
| dark muted `#86868b` on `#000` / `#1d1d1f` | 5.80 / 4.65 | 4.5 | PASS |
| dark link `#2997ff` on `#000` / `#1d1d1f` | 6.96 / 5.58 | 4.5 | PASS |
| white CTA on `#2997ff` | 3.02 | 3.0 | PASS — **large-text only** (all dark CTAs are `text-xl font-bold`) |
| dark alert `#ff6961` on card / black | 5.97 / 7.45 | 4.5 | PASS |

## Implementation Notes

- **Dark mode stays class-driven** (manual 🌙/☀️ toggle in the nav) with the
  exact `prefers-color-scheme` values above — no automatic media query, so the
  user's choice always wins.
- **Brand exceptions (deliberate):** WhatsApp green `#25D366` with `navy`
  label (brand asset, 8.49:1), success `#047857`, iOS-red heart `#FF3B30`,
  fixed notification dot `#d70015` (constant so its white "1" keeps 5.38:1
  in dark mode too).
- **Pills:** active = inverted near-black/off-white (`.pill-active`);
  inactive = secondary-canvas fill + hairline + `text-main` (never a color).
- **Legacy aliases** (`navy`, `panel`, `gold`) are remapped to the Apple
  palette as a safety net for stray classes.
- Scrollbars: auto-hide thumb `rgba(29,29,31,.3)` light / `rgba(245,245,247,.25)`
  dark — neutral, never brown.
