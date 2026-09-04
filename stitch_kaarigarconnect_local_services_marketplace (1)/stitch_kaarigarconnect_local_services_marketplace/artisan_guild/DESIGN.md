---
name: Artisan Guild
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#3f4944'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#6f7974'
  outline-variant: '#bfc9c2'
  surface-tint: '#226a53'
  primary: '#004331'
  on-primary: '#ffffff'
  primary-container: '#0d5c46'
  on-primary-container: '#8cd2b6'
  inverse-primary: '#8ed5b9'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#5c2f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#7d4200'
  on-tertiary-container: '#ffb477'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#aaf1d4'
  primary-fixed-dim: '#8ed5b9'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#00513d'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  container-max: 75rem
---

## Brand & Style

This design system establishes a high-trust, hyper-local service exchange tailored for the civic and domestic realities of Hyderabad, Sindh. The visual posture avoids disposable gig-economy aesthetics in favor of dignified craftsmanship, civic permanence, and institutional dependability. 

The aesthetic is **Modern Artisan-Utility**: combining crisp editorial typography, warm organic stone and linen undertones, and authoritative jewel-toned botanical greens. The interface conveys mutual respect between homeowners and skilled technicians (*kaarigars*), foregrounding technical credibility, clear upfront pricing, neighborhood proximity, and government or guild-backed verification badges. 

Tactile cues lean on physical paper-card metaphors, structured hairline borders, and warm, unhurried negative space that builds immediate confidence across both urgent utility dispatches and planned artisan commissions.

## Colors

The palette grounds itself in deep Sindhi botanical greens, sun-baked terracotta ochres, and natural bleached stone.

- **Primary (`#0D5C46`)**: Forest Teal. Used for authoritative anchor elements: primary CTAs, active tab indicators, verification shields, and structural branding. Represents permanence, legitimacy, and trust.
- **Secondary (`#0F766E`)**: Deep Sea Teal. Serves as interactive hover/focus states for primary elements, secondary chips, active filters, and informational highlights.
- **Tertiary (`#D97706`)**: Warm Ochre / Amber. Reserved strictly for ratings, star accents, urgent service callouts (e.g., immediate gas/electric triage), and status alerts.
- **Neutral (`#1F2937`)**: Deep Charcoal. Delivers high-contrast legibility for titles and primary labels, supported by `#4B5563` for secondary descriptors.
- **Surfaces**: Canvas begins at `#FBFBF9` (warm alabaster cream) to reduce eye fatigue under high ambient sunlight. Elevated cards utilize pure `#FFFFFF` with hairline borders (`#E5E7EB`) to establish crisp optical planes.

## Typography

The typographic system pairs the welcoming, structured geometry of Plus Jakarta Sans for displays and section headers with the neutral, hyper-legible precision of Inter for data density, pricing figures, and body copy.

All numerical figures representing currency (PKR) and performance stats (jobs completed, star ratings) must use tabular lining figures to ensure vertical alignment across dense comparison lists. Headings favor tighter negative tracking (`-0.02em` to `-0.01em`) to create cohesive title locks, while micro-labels and status badges expand slightly (`0.02em` to `0.04em`) to maintain sharp readability on low-cost mobile displays under bright outdoor conditions.

## Layout & Spacing

Layouts follow an 8pt architectural rhythm, with a strict 4pt baseline for micro-alignments (chips, badges, and icon lockups). 

- **Mobile (< 768px)**: 4-column layout with `16px` (`1rem`) outer screen gutters. Bottom navigation bars and urgent floating triage trays take precedence. Touch targets adhere to an uncompromising 48px minimum hit area to accommodate hands on the move.
- **Tablet (768px - 1024px)**: 8-column layout with `24px` (`1.5rem`) gutters. Splits category navigation and technician search results into master-detail views.
- **Desktop (> 1024px)**: 12-column layout maxing out at `1200px` (`75rem`), flanked by automatic margins. Preserves generous white space around service cards to emphasize portfolio imagery, CNIC/guild badge verification, and detailed fee schedules.

## Elevation & Depth

This design system avoids exaggerated, artificial shadows in favor of a low-elevation, physical card architecture that echoes tactile stationery and structured ledger sheets.

- **Surface Ground**: `#FBFBF9`. The bedrock canvas layer.
- **Level 1 (Default Card Surface)**: `#FFFFFF` resting on `#FBFBF9`, framed with an explicit 1px boundary of `#E5E7EB` and a faint ambient veil: `0 1px 3px rgba(13, 92, 70, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)`.
- **Level 2 (Hovered Cards & Interactive Filters)**: `0 4px 12px rgba(13, 92, 70, 0.08), 0 2px 4px rgba(0, 0, 0, 0.02)`. The slight green-tinted shadow reinforces brand presence without muddying the neutral background.
- **Level 3 (Modals, Triage Drawers & Booking Trays)**: `0 12px 32px rgba(17, 24, 39, 0.12), 0 4px 8px rgba(17, 24, 39, 0.04)`. Accompanied by a 30% alpha charcoal backdrop veil (`rgba(17, 24, 39, 0.35)`).
- **Outlines**: Fine 1px borders (`#E5E7EB` resting, `#0D5C46` active/focused) govern all component surfaces, providing structural legibility even when brightness is dimmed on mobile hardware.

## Shapes

With a roundedness level of `2`, the design system projects approachable professionalism without appearing toy-like or juvenile.

- **Base Radius (`0.5rem` / `8px`)**: Applied to all standard buttons, inputs, category tiles, verification tags, and small cards.
- **Large Radius (`1rem` / `16px`)**: Applied to master kaarigar profile summaries, service detail sheets, search modals, and image carousels.
- **Extra Large Radius (`1.5rem` / `24px`)**: Reserved for bottom sheet sheet-drawers and mobile action modals.
- **Pill / Circular (`9999px`)**: Exclusively reserved for status indicators, counter badges, verification pips, and avatar rings.

## Components

### Buttons
- **Primary**: Solid `#0D5C46` background with `#FFFFFF` text. Height `48px` on mobile, `44px` on desktop. Subtle inset bevel effect via `0 1px 0 rgba(255,255,255,0.15)` and rounded-md geometry (`8px`). Hover state shifts to `#0F766E`.
- **Urgent / Express Booking**: Solid `#D97706` background with `#FFFFFF` text. Used exclusively for emergency repairs (pipe bursts, breaker failures).
- **Secondary**: Crisp `#FFFFFF` surface with 1.5px `#0D5C46` outline and text. Hover brings a 6% tint of teal (`#F0FDF4`).
- **Tertiary / Ghost**: Transparent surface with `#1F2937` text; turns to `#0D5C46` on hover with a faint grey wash.

### Cards (Kaarigar Profile & Job Posts)
- Built on `#FFFFFF` with a 1px `#E5E7EB` border.
- Layout splits into three zones:
  1. Top header with technician thumbnail, verified shield badge in `#0D5C46`, name in `headline-sm`, and star rating with review counts in `#D97706`.
  2. Middle body with micro-tags for primary specialty (e.g., "Inverter AC Diagnostics", "Three-Phase Wiring") and localized travel radius ("Qasimabad & Latifabad").
  3. Action footer featuring transparent base call rates (e.g., "Rs. 500 Visit Fee") and high-contrast "Book Now" CTA.

### Verification Chips & Badges
- **Verified Shield**: Pill container with `#ECFDF5` background, `#065F46` border, `#0D5C46` typography, and a checkmark/seal icon.
- **Urgent Triage Tag**: Pill container with `#FFFBEB` background, `#D97706` text, and pulsating micro-dot.

### Form Inputs & Selectors
- Background: `#FFFFFF` with `#E5E7EB` 1px border. Height: `44px`. Text: `#1F2937`.
- Focus state: Replaces border with `#0D5C46` and adds an outer focus ring: `0 0 0 3px rgba(13, 92, 70, 0.15)`.
- Includes explicit persistent label above the field in `label-md` (`#374151`) and optional micro-hint below in `#6B7280`.

### Selection Controls (Checkbox & Radio)
- Checked state fills with `#0D5C46` displaying a crisp white mark.
- Unchecked state uses a 1.5px border of `#9CA3AF` on `#FFFFFF`.
- Sizing set strictly to `20x20px` with an expanded invisible 44px hit-box for thumb accuracy.

### Neighborhood / Sector Selector (Custom Component)
- Horizontal swipeable segment control for Hyderabad localities (e.g., Saddar, Latifabad, Qasimabad, Citizen Colony).
- Active segment: `#0D5C46` pill with `#FFFFFF` text. Inactive segments: `#F3F4F6` with `#4B5563` text.