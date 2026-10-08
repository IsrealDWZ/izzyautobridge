# IzzyAutoBridge — "Apple Premium Minimal" Design System

Single source of truth for design tokens. CSS custom properties live in
`src/index.css` (`:root` = light base, `.dark` = dark matrix); Tailwind
semantic colors in `tailwind.config.js` map to these exact variables.
Apple's monochromatic structure with a **fully monochrome accent**: no
blue, no green, no red anywhere in the UI — interactive elements are
near-black in light mode and off-white in dark mode (client request).

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

## Interactive Accents & Derived Tokens (all monochrome)

| Token | Light | Dark | Role |
|---|---|---|---|
| `--accent-action` / rgb triple | `#1d1d1f` | `#f5f5f7` | CTAs, links, chevrons, progress bar, focus rings, native control tint — the **only** accent |
| `--text-on-action` | `#f5f5f7` | `#1d1d1f` | Text/icons on `--accent-action` surfaces (always the inverse pair) |
| `--accent-alert` | `#6e6e73` | `#86868b` | Validation text/borders — ash, never red |
| `--accent-hover` | `#6e6e73` | `#6e6e73` | Neutral gray transitions and hover rings |
| `--text-inverse` | `#1d1d1f` | `#f5f5f7` | Text on secondary surfaces (nav/footer) |
| `--text-inverse-muted` | `rgba(29,29,31,.75)` | `rgba(245,245,247,.75)` | 75% text on secondary (7.33:1 / 9.17:1) |

Accent colors are fed to Tailwind as `rgb(var(--accent-*-rgb) / <alpha-value>)`
so opacity modifiers (`bg-action/10`) work in both modes. Buttons use
`hover:opacity-85` (not brightness) so hover feedback works on near-black.
Legacy aliases (`gold`, `whatsapp`, `success`) are remapped to the
monochrome palette as a safety net.

## Typography

System stack only — zero webfonts: `-apple-system, BlinkMacSystemFont,
"Segoe UI", Roboto, Helvetica, Arial, sans-serif`. Display headings use the
same stack with Apple-style tight tracking (`letter-spacing: -0.018em`).
Fraunces/Inter removed from `index.html`.

## The 3 Apple Rules as Implemented

1. **60-30-10** — `#f5f5f7` is the page canvas (60%); `#ffffff` is cards,
   nav, footer, badges (30%); the monochrome accent (`#1d1d1f` light /
   `#f5f5f7` dark, plus ash `#6e6e73` hovers) appears only on CTAs, links,
   icons, progress and focus rings (≤10%).
2. **Generous white space** — sections run `py-16`…`py-28` (64–112px) with
   `max-w-7xl` containers; cards keep 20–32px internal padding.
3. **Neutral grays for content** — no colorful section backgrounds and no
   saturated accents anywhere. Segments alternate `#ffffff` cards on the
   `#f5f5f7` canvas; product photography supplies all color. Constant dark
   panels (`#1d1d1f` Comparison hero, EV results panel, black hero
   gradient) are Apple's black-promo-panel idiom, stay dark in both modes,
   and use **local white buttons/bars/tints** (`bg-white text-[#1d1d1f]`,
   `bg-white/10`, `border-white/20`) so they don't depend on theme tokens.

## Contrast Audit (all pairs script-verified)

| Pair | Ratio | Need | Verdict |
|---|---|---|---|
| on-action `#f5f5f7` on action `#1d1d1f` (light CTA) | 15.46 | 4.5 | PASS |
| on-action `#1d1d1f` on action `#f5f5f7` (dark CTA) | 15.46 | 4.5 | PASS |
| link `text-action` `#1d1d1f` on card / canvas | 16.83 / 15.46 | 4.5 | PASS |
| link `text-action` `#f5f5f7` on `#000` / `#1d1d1f` | 19.29 / 15.46 | 4.5 | PASS |
| `#1d1d1f` on canvas `#f5f5f7` / card `#ffffff` | 15.46 / 16.83 | 4.5 | PASS |
| muted `#6e6e73` on canvas / card | 4.66 / 5.07 | 4.5 | PASS |
| alert/ash `#6e6e73` on card / canvas | 5.07 / 4.66 | 4.5 | PASS |
| dark text `#f5f5f7` on `#000` / `#1d1d1f` | 19.29 / 15.46 | 4.5 | PASS |
| dark muted `#86868b` on `#000` / `#1d1d1f` | 5.80 / 4.65 | 4.5 | PASS |
| dark alert/ash `#86868b` on `#000` / `#1d1d1f` | 5.80 / 4.65 | 4.5 | PASS |
| active pill `#f5f5f7` on `#1d1d1f` | 15.46 | 4.5 | PASS |
| white on gray hover `#6e6e73` | 5.07 | 4.5 | PASS |
| panel CTA `#1d1d1f` on white (constant dark panels) | 16.83 | 4.5 | PASS |
| inverse-muted (nav/footer subtext) light / dark | 7.33 / 9.17 | 4.5 | PASS |
| heart icon `currentColor` (= text-main) on card | 16.83 | 3.0 | PASS |
| FAB badge `text-main` on `bg-primary` | 15.46 | 4.5 | PASS |

Every accent pair passes AA at normal text sizes — there are **no**
large-text-only exceptions left (the previous blue system had two).

## Implementation Notes

- **Dark mode stays class-driven** (manual 🌙/☀️ toggle in the nav) with the
  exact `prefers-color-scheme` values above — no automatic media query, so the
  user's choice always wins.
- **Monochrome by client request:** the former blue `#0071e3/#2997ff`
  accent, red `#d70015` alerts/heart/badge, green `#25D366` WhatsApp
  buttons and `#047857` success are all replaced by the near-black/off-white
  action pair and ash. WhatsApp affordances are identified by icon + label,
  not color; the favorite heart fills with `currentColor`; the notification
  badge inverts (`bg-primary text-main` + hairline) against the FAB.
- **Pills:** active = inverted near-black/off-white (`.pill-active`);
  inactive = secondary-canvas fill + hairline + `text-main` (never a color).
- **Buttons flip as a unit:** `bg-action` + `text-onaction` always resolve
  to the inverse pair (black/white ↔ white/black) — never pair `bg-action`
  with a fixed `text-white`.
- Scrollbars: auto-hide thumb `rgba(29,29,31,.3)` light / `rgba(245,245,247,.25)`
  dark — neutral, never colored.
