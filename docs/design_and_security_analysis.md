# KaarigarConnect: UI/UX Design Analysis & Web/Mobile Security Architecture

## Executive Summary
KaarigarConnect is a hyper-local, high-trust services marketplace engineered for the civic and domestic ecosystem of Hyderabad, Sindh (Latifabad, Qasimabad, Saddar, Auto Bhan, Citizen Colony). This document synthesizes the visual design analysis across all 14 reference interface screens and establishes the security architecture governing both the Web Application and Mobile Application.

---

## Part 1: Comprehensive UI/UX Design System Analysis

### 1. Brand Identity & Aesthetic Philosophy: "Modern Artisan-Utility"
The visual identity transitions away from disposable gig-economy aesthetics toward institutional permanence, dignified craftsmanship, and civic trust.

- **Design Persona**: High-trust local service exchange linking verified skilled craftsmen (*kaarigars*) with domestic and commercial clients.
- **Visual Cues**: Tactile paper-card surfaces, hairline borders (`1px #E5E7EB`), crisp editorial typography, warm organic stone/alabaster backdrops, and authoritative jewel-toned botanical greens.
- **Verification Badging**: NADRA CNIC verification seals, Sindh Guild Certification IDs, and transparent pricing cards.

### 2. Color System Tokens (`artisan_guild/DESIGN.md`)
The color palette derives from deep Sindhi botanical greens, sun-baked terracotta ochres, and natural bleached stone:

| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `primary` | `#0D5C46` | **Forest Teal**: Structural branding, primary buttons, verified shields, active navigation tabs. |
| `secondary` | `#0F766E` | **Deep Sea Teal**: Interactive hover states, active category chips, secondary icons. |
| `tertiary` | `#D97706` | **Warm Ochre / Amber**: Urgency highlights, emergency triage pills, star ratings, alert banners. |
| `background` / `surface` | `#FBFBF9` | **Warm Alabaster**: Canvas background to eliminate high-glare eye strain under outdoor sunlight. |
| `surface-container-lowest` | `#FFFFFF` | **Pure White**: Raised physical cards, elevated drawers, input fields, modal dialogs. |
| `on-surface` | `#1F2937` | **Deep Charcoal**: High-contrast typography for headlines and prices. |
| `on-surface-variant` | `#4B5563` | **Medium Slate**: Subtitles, body descriptors, secondary meta text. |

### 3. Typography & Numerical Hierarchy
- **Header Font Family**: `Plus Jakarta Sans` (Tight negative tracking `-0.02em` to `-0.01em` for authoritative lockups).
- **Body & Data Matrix Font Family**: `Inter` (Neutral precision for prices in PKR, rating scores, distance metrics).
- **Tabular Lining Figures**: All monetary figures (e.g. `Rs. 500 Visit Fee`, `Rs. 1,800 Total`) use tabular lining font metrics for strict vertical alignment in comparison lists.

### 4. Layout, Breakpoints & Spatial Grid
Built on an uncompromising **8pt spatial grid system** with a **4pt baseline alignment**:
- **Desktop Viewport (> 1024px)**: 12-column responsive layout capped at `1200px` container width with generous padding.
- **Tablet Viewport (768px - 1024px)**: 8-column layout with split master-detail view for category search and provider lists.
- **Mobile Viewport (< 768px)**: 4-column layout with `16px` outer gutters, fixed bottom navigation bar, 48px minimum touch targets, and pull-up triage drawers.

---

## Part 2: Security Architecture & Threat Model

### 1. Web & Mobile Security Controls
KaarigarConnect implements enterprise-grade defense-in-depth across both web and mobile clients:

```
[ Client Interface ] ──> [ Input Sanitizer (XSS Filter) ] ──> [ Rate Limiter (IP Bucket) ] ──> [ RBAC Auth Middleware ] ──> [ Mock API / State Store ]
```

#### A. Cross-Site Scripting (XSS) Prevention & DOM Sanitization
- All dynamic user inputs (service descriptions, customer reviews, provider names, chat messages) are sanitized through a strict DOMPurify policy prior to HTML injection.
- Script tags, `onload`, `javascript:` protocols, and inline handlers are stripped automatically.

#### B. Cross-Site Request Forgery (CSRF) & Token Protection
- Stateful API mutations (submitting service requests, accepting dispatches, changing online status) require a cryptographic double-submit cookie CSRF token (`X-CSRF-Token`).
- JWT tokens are stored with mock `SameSite=Strict` and `HttpOnly` simulated storage with token refresh validation.

#### C. Role-Based Access Control (RBAC)
Three distinct access tiers are enforced at runtime:
1. **Customer Role (`ROLE_CUSTOMER`)**: Can request services, view map directory, use AI triage, track live orders, rate kaarigars, and view past invoices. Cannot access provider dispatch queues or security admin tools.
2. **Kaarigar Provider Role (`ROLE_PROVIDER`)**: Can toggle online status, view incoming dispatch offers, accept/decline jobs, manage service rates, and view daily earnings.
3. **Security Admin Role (`ROLE_ADMIN`)**: Full access to Security Control Panel, XSS sandbox tester, JWT token inspector, audit log trail, rate limiter meters, and worker verification audit.

#### D. Rate Limiting & Abuse Prevention
- Simulated Token Bucket algorithm limiting user API actions to **30 requests per minute**. Excess requests trigger HTTP 429 "Too Many Requests" state with exponential backoff timers.

#### E. Doorstep Physical Security: Safety OTP Verification
- To protect homeowners and artisans during home visits, each dispatched job generates a unique 4-digit Safety PIN (e.g. `#8942`).
- The homeowner verifies this PIN with the technician before granting entrance, preventing impersonation.

---

## Part 3: Screen Inventory & UI Feature Matrix

| Screen Name | Target Platform | Primary UI Key Elements | Dynamic Capabilities |
| :--- | :--- | :--- | :--- |
| **Desktop Homepage** | Web (Desktop/Tab) | Emergency Hotline Pill, Live Telemetry Bar, Category Grid, Master Search | Quick sector filter, keyboard shortcuts (`⌘K`), instant booking drawer |
| **Map Directory** | Web & Mobile | Interactive Leaflet-style grid map, Kaarigar location markers, Radius slider | Dynamic marker filtering, distance calculations, popover booking |
| **Kaarigar AI Triage** | Web & Mobile | Text/Voice diagnostic input, AI diagnostic breakdown, Tool list, PKR estimate | Real-time issue diagnosis, dynamic cost breakdown, 1-click dispatch |
| **Imran Ali Profile** | Web & Mobile | Verified CNIC shield, Sindh Guild badge #SD-8821, Work photo gallery | Interactive tab switcher, review filter, direct service request modal |
| **Service Request Flow** | Web & Mobile | 4-step wizard (Details, Sector/Urgency, Slot, Payment breakdown) | Real-time price calculator, photo preview, payment method switcher |
| **Live GPS Tracking** | Web & Mobile | Status timeline, Animated worker location, OTP Safety PIN (#8942) | Real-time status simulation (En Route -> Doorstep -> Work -> Done), SOS alert |
| **Provider Console** | Web & Mobile | Online status toggle, Incoming job modal, Earnings stats, Route map | Instant job accept/reject with timer, earnings counter, dispatch queue |
| **Security Control Panel** | Web | XSS tester sandbox, JWT payload inspector, RBAC role switcher, Audit log | Live attack simulation, token validator, rate limiter meter |

---

## Summary
The combination of the **Artisan Guild** design system and the multi-layered security engine delivers an aesthetically impressive, highly responsive, and secure experience across desktop and mobile devices.
