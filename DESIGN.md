# anygym — Universal Gym Membership Design System

> **Design Intent**: The anygym Universal Gym Membership design system delivers an accessible, high-contrast, token-driven interface uniting universal gym access, biometric WHO health calculations, and member habit tracking under a unified, accessible dark visual architecture.

---

## 1. Context and Goals

### Product Surface & Target Audience
- **Product Name**: `anygym — Universal Gym Membership`
- **Surface**: High-density responsive web app dashboard & member portal
- **Live Reference**: [https://www.any-gym.com/#how-it-works](https://www.any-gym.com/#how-it-works)
- **Primary Audience**: Authenticated members, fitness athletes, and universal gym network operators
- **Tone & Voice**: Concise, confident, implementation-focused

### Core Objectives
1. Provide instant access to 2,500+ partnered athletic gyms with single-credential universal check-in.
2. Deliver exact WHO-standard biometric calculations (Metric BMI, healthy weight brackets, exact kilogram deficit or surplus advice).
3. Offer an automated 30-day transformation plan engine tailored to 3 animated physique silhouettes and 4 training trajectories.
4. Enable consistent habit tracking through daily weigh-in logs, milestone progression curves, and streak monitoring.

---

## 2. Design Tokens and Foundations

All visual values in anygym components **must** be sourced from these semantic tokens without ad-hoc raw values.

### Typography Tokens
The typography hierarchy uses `Poppins` with the system font fallbacks:
- `font.family.primary`: `__Poppins_6bee3b`
- `font.family.stack`: `__Poppins_6bee3b, __Poppins_Fallback_6bee3b, system-ui, sans-serif`
- `font.size.base`: `16px`
- `font.weight.base`: `400`
- `font.lineHeight.base`: `24px`

| Token Name | Value | Line Height | Usage Context |
| :--- | :--- | :--- | :--- |
| `font.size.xs` | `14px` | `20px` | Metadata, badges, input hints, table labels |
| `font.size.sm` | `16px` | `24px` | Standard body text, button labels, form inputs |
| `font.size.md` | `18px` | `28px` | Emphasized body text, list titles, card subheadings |
| `font.size.lg` | `20px` | `28px` | Widget titles, metric displays, modal headers |
| `font.size.xl` | `30px` | `36px` | Section headlines, key biometrics readouts |
| `font.size.2xl` | `36px` | `44px` | Primary page headers, view heroes |
| `font.size.3xl` | `60px` | `1.08` | Primary landing statement, hero display typography |

### Color Palette Tokens

| Semantic Token | Hex / Value | Role & Constraint |
| :--- | :--- | :--- |
| `color.surface.base` | `#000000` | Application canvas, background root **must** be pure black. |
| `color.surface.raised` | `#ff6b6b` | Brand coral accent, primary CTAs, active states, focus indicator. |
| `color.text.inverse` | `#ffffff` | High-contrast text on dark backgrounds; **must** maintain ≥7:1 ratio. |
| `color.text.primary` | `#111827` | High-contrast dark text when rendering on light/raised surfaces. |
| `color.text.secondary` | `#4b5563` | Subdued secondary typography; used on muted metadata badges. |
| `color.text.tertiary` | `#171717` | Tertiary dark text for subtle container contrast. |
| `color.border.default` | `#e5e7eb` | Default crisp boundary lines for elevated cards on light surfaces. |
| `color.border.muted` | `#d1d5db` | Muted division rules and neutral container outlines. |

### Spacing Scale Tokens
Components **must** adhere strictly to the 8-point semantic spacing scale:
- `space.1`: `2px` (sub-pixel alignment, hairline offsets)
- `space.2`: `4px` (pill inner padding, micro icon spacing)
- `space.3`: `6px` (tight badge padding, compact field gaps)
- `space.4`: `8px` (standard input padding, grid spacing base)
- `space.5`: `10px` (intermediate vertical offsets)
- `space.6`: `12px` (card content separation, button internal padding)
- `space.7`: `16px` (container inner gutters, section grouping)
- `space.8`: `24px` (macro section margins, layout column gaps)

### Radii, Shadow & Motion Tokens
- `radius.xs`: `8px` — Standard curvature for buttons, form inputs, dialog cards, and widgets.
- `radius.sm`: `9999px` — Full rounded curvature for navigation pills, category chips, and status badges.
- `shadow.1`: `0px 1px 2px 0px rgba(0, 0, 0, 0.05)` — Subtle depth for raised cards.
- `motion.duration.instant`: `150ms` (`cubic-bezier(0.4, 0, 0.2, 1)`) — State transitions (hover, active, focus).
- `motion.duration.fast`: `300ms` (`cubic-bezier(0.4, 0, 0.2, 1)`) — Drawer expansion, tab switches, and modal entrance.

---

## 3. Component-Level Rules

Every interactive component family **must** define 7 concrete states:
1. `default`
2. `hover`
3. `focus-visible`
4. `active`
5. `disabled`
6. `loading`
7. `error`

Component page density in the application: **Inputs (15), Buttons (11), Links (11), Navigation (3), Lists (1)**.

### 3.1. Inputs Family (Density: 15)
Includes: Height slider, Weight slider, Target weight slider, Auth email, Auth password, Auth full name, Modal height, Modal weight, Modal target weight, Check-in weigh-in field, Check-in notes field, Workout plan goal selector, Physique selector, Periodization week filter, Search input.

- **Anatomy**: Label (`font.size.xs`, bold), Input container (`radius.xs=8px`, `space.4=8px` padding), Leading icon, Trailing unit/status indicator, Error/Helper text (`font.size.xs`).
- **States**:
  - `default`: Background `#0c0e12`, border `#202533`, text `#ffffff`.
  - `hover`: Border `#4b5563`, pointer cursor.
  - `focus-visible`: `outline: 2px solid #ff6b6b !important`, `outline-offset: 2px`, coral glow.
  - `active`: Border `#ff6b6b`.
  - `disabled`: Opacity `0.45`, cursor `not-allowed`, background `#14171f`.
  - `loading`: Input fields locked with an animated spinner or pulse placeholder.
  - `error`: Border `#f43f5e`, error message with alert icon rendered below label.
- **Interactions**:
  - Keyboard: <kbd>Tab</kbd> navigates between fields; <kbd>Arrow Left/Right</kbd> increments/decrements sliders.
  - Pointer & Touch: Direct scrub on sliders, 44px minimum tap target height.
- **Overflow & Empty State**:
  - Form fields **must** truncate overflowing single-line input gracefully with text ellipsis.
  - Empty numeric inputs **must** default to fallback boundaries (e.g., $100\text{ cm} \le \text{height} \le 250\text{ cm}$).

### 3.2. Buttons Family (Density: 11)
Includes: Primary Hero CTA, BMI Recalculate CTA, Plan Generation Button, Modal Sign In / Sign Up Submit, Habit Check-In Submit, Modal Close Button, Periodization Week Tabs (4), Sign Out Trigger.

- **Anatomy**: Button text (`font.size.xs` or `font.size.sm`, bold/black), optional leading or trailing icon, container with `radius.xs=8px` (action buttons) or `radius.sm=9999px` (pill switches).
- **States**:
  - `default`: Primary: Background `#ff6b6b`, text `#ffffff`. Secondary: Background `#14171f`, border `#202533`, text `#e5e7eb`.
  - `hover`: Primary: Background `#ff5252`, scale `1.01`. Secondary: Background `#1a1f2b`, border `#4b5563`.
  - `focus-visible`: `outline: 2px solid #ff6b6b !important`, `outline-offset: 2px`.
  - `active`: Scale `0.98`, background `#fa5252`.
  - `disabled`: Opacity `0.4`, cursor `not-allowed`, pointer-events none.
  - `loading`: Text replaced with spinning loader SVG, `aria-busy="true"`, pointer events locked.
  - `error`: Shake animation (200ms) with border `#f43f5e`.
- **Interactions**:
  - Keyboard: Activated on <kbd>Enter</kbd> or <kbd>Space</kbd>.
  - Pointer: Instant cursor transition, ripple/glow response within `150ms`.

### 3.3. Links Family (Density: 11)
Includes: Universal Club locations link, WHO Clinical Guidelines link, Supabase docs reference, Auth mode switchers (2), Navigation anchor links (4), Terms & Privacy footer links (2).

- **Anatomy**: Underlined or high-contrast inline text, external link indicator icon for off-site URLs.
- **States**:
  - `default`: Text `#a1a1aa`, inline decoration none.
  - `hover`: Text `#ff6b6b`, text decoration underline.
  - `focus-visible`: `outline: 2px solid #ff6b6b !important`, `outline-offset: 2px`.
  - `active`: Text `#ffffff`.
  - `disabled`: Text `#52525b`, pointer-events none.
  - `loading`: Muted shimmer animation.
  - `error`: Red accent fallback if target fails.
- **Interactions**:
  - Keyboard: <kbd>Enter</kbd> triggers navigation.
  - Touch: Minimum tap bounding box of 44×44px.

### 3.4. Navigation Family (Density: 3)
Includes: Top Fixed Global Navbar, Pill Tab Segmented Controller (Overview, BMI Advisor, 30-Day Plan, Member Tracker), Mobile Navigation Drawer.

- **Anatomy**: Root sticky bar (`h-20`, backdrop-blur, `#000000/90`), brand lockup, segmented pill tab container (`radius.sm=9999px`), member status avatar/pill.
- **States**:
  - Tab default: Text `#a1a1aa`, background transparent.
  - Tab hover: Text `#ffffff`, background `#1a1f2b`.
  - Tab active/selected: Background `#ff6b6b`, text `#ffffff`, font-black, coral shadow glow.
  - Tab focus-visible: Focus ring `#ff6b6b`.
- **Edge Cases & Overflow**:
  - Mobile screens (< 768px): Horizontal segmented tab bar becomes a swipeable pill scroller with hidden scrollbar.
  - Global nav bar sticks to top viewport edge (`z-50`) during high-depth scrolling.

### 3.5. Lists Family (Density: 1)
Includes: 30-Day Periodization Daily Exercise Breakdown & Member Weight Progress Log List.

- **Anatomy**: Ordered list of day cards or table rows, day badges (`radius.sm=9999px`), target muscle group label, set/rep counter, completion toggle button.
- **States**:
  - `default`: Card background `#0c0e12`, border `#202533`.
  - `hover`: Card border `#ff6b6b/50`, transform translate-x-1.
  - `active`: Highlighted card background `#14171f`.
  - `completed`: Strikethrough metadata, emerald checkmark icon, opacity `0.75`.
  - `empty-state`: Illustrated graphic with "No check-ins logged yet. Record your morning weight to track progress!" message.
  - `loading`: 4-row skeleton pulse cards.

---

## 4. Accessibility Requirements & Acceptance Criteria (WCAG 2.2 AA)

1. **Color Contrast**:
   - Primary text (`#ffffff`) on base canvas (`#000000`) **must** measure 21:1 (passes AAA).
   - Brand coral (`#ff6b6b`) against `#000000` base surface **must** measure ≥5.1:1 (passes AA for normal text, AAA for large text).
   - Any secondary gray text on dark surfaces **must** not drop below 4.5:1 for body copy (`#9ca3af` or higher).
2. **Keyboard Navigation**:
   - All interactive controls **must** be reachable via standard <kbd>Tab</kbd> sequence.
   - Interactive modals **must** trap keyboard focus within the dialog container while open.
   - Pressing <kbd>Escape</kbd> **must** dismiss modals immediately.
3. **Focus Indicators**:
   - Focus outline **must** be visible on every focused element (`outline: 2px solid #ff6b6b !important; outline-offset: 2px !important`).
   - Focus indicators **must not** be suppressed using `outline: none` without replacement.
4. **Touch & Click Target Sizing**:
   - All buttons, sliders, and navigation pills **must** provide a minimum target area of 44×44px on touch devices.
5. **Screen Readers & ARIA**:
   - Modals **must** provide `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
   - Visual charts and gauges **must** include equivalent textual descriptions via `aria-label` or `sr-only` summaries.

---

## 5. Content and Tone Standards

| Tone Principle | Standard | Positive Example | Negative Example |
| :--- | :--- | :--- | :--- |
| **Concise** | Keep notifications short and actionable. | *"Saved 74.2 kg to your log."* | *"Your weight log has been successfully persisted into the remote storage database."* |
| **Confident** | Use direct, active verbs for commands and stats. | *"Unlock Universal Gym Pass"* | *"Click here if you might want to consider accessing gyms."* |
| **Implementation-Focused** | Label biometric advice with precise clinical metrics. | *"Target Deficit: 8.5 kg to reach normal BMI 24.9"* | *"You should lose a few pounds when you feel like it."* |

---

## 6. Anti-Patterns & Prohibited Implementations

- ❌ **Do not** introduce arbitrary non-token border radii (e.g., `rounded-md`, `rounded-xl`). **Must** strictly use `radius.xs=8px` or `radius.sm=9999px`.
- ❌ **Do not** write raw hex values directly in React components when semantic tokens exist.
- ❌ **Do not** render interactive components without all 7 defined states.
- ❌ **Do not** trap users in modals; backdrops must dismiss on outside click, and <kbd>Escape</kbd> must close dialogs.
- ❌ **Do not** use low-contrast text (e.g. `#333` or `#555` on `#000`) that fails the 4.5:1 contrast check.
- ❌ **Do not** scroll the background document while a modal is open (`overflow: hidden` on body is mandatory).

---

## 7. QA Checklist & Verification Gates

- [x] **Tokens Check**: `space.1` through `space.8` mapped into Tailwind theme.
- [x] **Typography Check**: `Poppins` font loaded with scale (`14px` to `60px`).
- [x] **Radii Check**: Strictly `8px` (`rounded-token-xs`) and `9999px` (`rounded-token-sm`).
- [x] **Focus-Visible Check**: Coral focus outline active on all tabbable elements.
- [x] **Modal Scroll-Lock Check**: Opening auth modal locks body scroll; <kbd>Escape</kbd> closes modal.
- [x] **Keyboard Check**: Sliders scrubbable with arrow keys; forms submittable with <kbd>Enter</kbd>.
- [x] **Biometric Engine Check**: BMI and Kilogram target math accurate to WHO standards.
- [x] **Physique Animation Check**: 3 SVG animations (Excess weight, Athletic build, Slim) reactive to track selection.
- [x] **Zero Mock Data Gate**: Site displays clean landing page on first load; dashboard prompts compulsory auth.
