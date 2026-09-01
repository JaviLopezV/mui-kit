# my-ui-library

Shared UI component library based on Material UI.

## Purpose

This repository contains generic UI primitives shared between:

- `my-portfolio`
- `mantenimientos-aj`
- `next-cv-builder`

Material UI is the foundation. Consumer applications should prefer components exported by this library instead of importing equivalent abstractions directly from `@mui/material`.

## Sources of truth

Before changing architecture, components, theme contracts, or public exports, read:

- `docs/architecture.md`
- `docs/component-roadmap.md`

Treat the roadmap priorities as strict scope boundaries. Do not implement components from a later priority unless the user explicitly requests that priority.

## Repository rules

Components in this repository MUST be application-agnostic.

Never introduce:

- business logic
- API calls
- application routing
- domain models
- project-specific stores
- project-specific translations or translation keys
- project-specific copy, assets, URLs, or configuration
- persistence, analytics, printing, downloading, or other application side effects

Keep routing, i18n, data fetching, state orchestration, schemas, and domain compositions in consumer applications.

Prefer composition over highly specialized components.

Prefer variants or semantic props over duplicated components.

Good:

```tsx
<Button tone="primary" />
<Button tone="danger" />
```

Bad:

```tsx
<PrimaryButton />
<DangerButton />
<SaveButton />
<DeleteButton />
```

Use the library's established naming conventions. `variant` describes visual structure, `tone` describes semantic intent, and `size` describes control scale.

## Material UI

Use MUI internally where appropriate. Preserve MUI interoperability and reuse its behavior, semantics, and TypeScript contracts.

Do not create wrappers that add no meaningful abstraction. Re-export the MUI primitive directly when the only goal is to provide a central import path.

A wrapper must provide at least one of:

- shared styling or design tokens
- shared behavior
- improved accessibility
- project-wide defaults
- meaningful variants or semantic props
- a materially simplified API

Use `sx` as an escape hatch, not as a replacement for recurring tokens or variants. Do not add hardcoded visual values when a theme token should own them.

## TypeScript

All public components must expose strongly typed props.

- Keep TypeScript strict.
- Avoid `any`.
- Prefer existing MUI prop types instead of redeclaring them.
- Use `Omit` only for intentional API differences.
- Use generics for data-driven values when appropriate.
- Use `ReactNode` for consumer-provided, already translated content.
- Use `forwardRef` when consumers need access to the root element.
- Preserve stable type declarations in every public entrypoint.

## Accessibility and responsive behavior

Public components must meet the accessibility requirements in `docs/architecture.md`.

- Preserve semantic HTML and keyboard behavior.
- Require accessible names for icon-only controls.
- Maintain visible focus and a minimum 44×44px interactive target.
- Associate form errors and helper text correctly.
- Use MUI dialog focus management and accessible labelling.
- Prefer mobile-first CSS responsive behavior.
- Use JavaScript media queries only when behavior or structure changes.
- Respect reduced-motion preferences when motion is introduced.

## Component size

Components and functions should remain small and maintainable.

Prefer composition when a component becomes too large or accumulates unrelated responsibilities. Compound components and slots are preferred over large combinatorial prop APIs.

## Public API

Only supported public components, types, tokens, and helpers may be exported from package entrypoints.

- Keep internal implementation components and helpers private.
- Do not expose deep imports.
- Update the exports map, declarations, README, and examples when the public API changes.
- Verify both ESM and CommonJS entrypoints.
- Do not export P1, P2, or P3 components while the implemented scope is P0.

## Required validation

For implementation changes, run:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

New public components require tests for behavior, accessibility, refs, responsive contracts where applicable, and public exports. Do not add application migrations unless the user explicitly requests them.
