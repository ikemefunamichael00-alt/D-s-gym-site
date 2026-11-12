# anygym — Universal Gym Membership

## Mission
Create implementation-ready, token-driven UI guidance for anygym — Universal Gym Membership that is optimized for consistency, accessibility, and fast delivery across dashboard web app.

## Brand
- Product/brand: anygym — Universal Gym Membership
- URL: https://www.any-gym.com/#how-it-works
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: structured, tokenized, content-first
- Main font style: `font.family.primary=__Poppins_6bee3b`, `font.family.stack=__Poppins_6bee3b, __Poppins_Fallback_6bee3b, system-ui, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=14px`, `font.size.sm=16px`, `font.size.md=18px`, `font.size.lg=20px`, `font.size.xl=30px`, `font.size.2xl=36px`, `font.size.3xl=60px`
- Color palette: `color.text.primary=#111827`, `color.text.secondary=#4b5563`, `color.text.tertiary=#171717`, `color.text.inverse=#ffffff`, `color.surface.base=#000000`, `color.surface.raised=#ff6b6b`, `color.border.muted=#d1d5db`, `color.border.default=#e5e7eb`
- Spacing scale: `space.1=2px`, `space.2=4px`, `space.3=6px`, `space.4=8px`, `space.5=10px`, `space.6=12px`, `space.7=16px`, `space.8=24px`
- Radius/shadow/motion tokens: `radius.xs=8px`, `radius.sm=9999px` | `shadow.1=rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px` | `motion.duration.instant=150ms`, `motion.duration.fast=300ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: inputs (15), buttons (11), links (11), navigation (3), lists (1).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
