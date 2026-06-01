# Project Overview

This repository contains a React Native Design System implemented as a monorepo.

The goal is to build a reusable component library that can be published to npm and consumed by external applications.

The scope of this repository is intentionally limited to the Design System layer.

Out of scope:

* Application screens
* Navigation
* Backend integration
* API clients
* Data fetching
* Authentication
* State management
* Business workflows

The focus is on:

* Design Tokens
* Reusable UI Components
* Storybook Documentation
* Accessibility
* Testing
* Packaging
* Release Automation

---

# Architecture

## Monorepo

The project must be implemented as a monorepo.

Recommended tooling:

* pnpm workspaces
* Turborepo

Repository structure:

```txt
design-system/
│
├── apps/
│   └── storybook/
│
├── packages/
│   ├── tokens/
│   └── ui/
│
├── .github/
│   └── workflows/
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

---

## Responsibility Boundaries

### apps/

Contains executable applications used during development.

Examples:

* Storybook
* Documentation sites
* Playgrounds

Applications are never published to npm.

---

### packages/

Contains publishable packages.

Examples:

```txt
@vacacode/tokens
@vacacode/ui
```

Packages must be independently buildable and releasable.

---

# Storybook First Development

Storybook is the primary development environment.

Components should be developed and validated in Storybook before being consumed by external applications.

Storybook acts as:

* Component development environment
* Visual testing environment
* Documentation platform
* Design review environment

Storybook must be treated as the source of truth for component behavior and visual states.

Dependency flow:

```txt
storybook
      ↓
@vacacode/ui
      ↓
@vacacode/tokens
```

Packages must never depend on Storybook.

---

# Design System Layers

Follow Atomic Design principles.

Dependency flow must always be:

```txt
tokens
  ↓
atoms
  ↓
molecules
  ↓
organisms
```

Dependencies must never point upward.

Examples:

* Atoms cannot import molecules.
* Molecules cannot import organisms.
* Components cannot define tokens.

---

# Design Tokens

Tokens are the single source of truth for visual decisions.

All visual values must originate from tokens.

Never hardcode:

* colors
* spacing
* typography
* radii
* shadows
* opacity

Incorrect:

```tsx
padding: 16
backgroundColor: '#0055FF'
```

Correct:

```tsx
padding: spacing.md
backgroundColor: colors.primary[500]
```

---

## Token Package Structure

```txt
packages/
└── tokens/
    └── src/
        ├── colors.ts
        ├── spacing.ts
        ├── typography.ts
        ├── radius.ts
        ├── shadows.ts
        └── index.ts
```

Public API:

```ts
import { colors, spacing } from '@vacacode/tokens'
```

Tokens should remain framework-agnostic whenever possible.

---

# UI Package

The UI package contains reusable React Native components.

Structure:

```txt
packages/
└── ui/
    └── src/
        ├── atoms/
        ├── molecules/
        ├── organisms/
        ├── hooks/
        ├── providers/
        ├── utils/
        └── index.ts
```

Components should be:

* composable
* reusable
* accessible
* maintainable
* domain-light

Avoid embedding business logic inside components.

---

# Required Component

## ItemCard

The ItemCard is the primary component of the exercise.

Supported variants:

* inbound
* outbound

Supported statuses:

* pending
* confirmed

Supported attention state:

* flagged

Required edge cases:

* long text truncation
* image fallback
* loading skeleton

The component should demonstrate composability and token consumption.

---

# Storybook Documentation

Every reusable component must have stories.

At minimum, ItemCard must include:

```txt
InboundConfirmed
InboundPending
OutboundConfirmed
OutboundPending
Flagged
LongLabel
MissingImage
Loading
```

Stories should document:

* variants
* states
* edge cases
* loading behavior

Storybook documentation should evolve alongside component development.

---

# TypeScript

Strict TypeScript is mandatory.

Required settings:

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true
}
```

Avoid:

* any
* unsafe assertions
* unnecessary casts

Prefer explicit and maintainable types.

---

# Accessibility

All reusable components should include reasonable accessibility support.

Examples:

* accessibilityRole
* accessibilityLabel
* semantic interactions
* meaningful labels

Accessibility should be implemented during development rather than added later.

---

# Performance

Components should be suitable for rendering within large virtualized lists.

Guidelines:

* avoid unnecessary re-renders
* memoize when justified
* avoid expensive calculations during render
* keep component APIs predictable

Maintain readability unless optimization provides measurable value.

---

# Styling

Prefer token-driven styling.

Styles should be colocated with components.

Example:

```txt
ItemCard/
  ItemCard.tsx
  ItemCard.styles.ts
  ItemCard.types.ts
  ItemCard.stories.tsx
  ItemCard.test.tsx
```

Avoid large centralized style files.

---

# Testing

Testing should validate behavior rather than implementation details.

Avoid testing internal implementation details.

---

## Unit Tests

Focus on:

* formatting utilities
* helper functions
* state mapping logic

---

## Component Tests

ItemCard must be tested for:

* inbound rendering
* outbound rendering
* flagged rendering
* loading state
* image fallback

Prefer user-visible assertions.

---

# Public API

Every package must expose a clean public API.

Correct:

```ts
import { ItemCard } from '@vacacode/ui'
```

Incorrect:

```ts
import { ItemCard } from '@vacacode/ui/dist/components/ItemCard'
```

Consumers should never import internal implementation details.

---

# Additional Repository Standards

## Package Naming

All publishable packages must use the following namespace:

```txt
@vacacode/tokens
@vacacode/ui
```

Never use relative imports across packages.

Incorrect:

```ts
import { colors } from '../../tokens/src/colors'
```

Correct:

```ts
import { colors } from '@vacacode/tokens'
```

---

## Git Workflow

### Branch Strategy

Use a lightweight trunk-based workflow.

Protected branch:

```txt
main
```

Feature development should happen in short-lived branches.

Examples:

```txt
feature/item-card
feature/storybook-setup
feature/tokens-package
feature/loading-skeleton
```

Bug fixes:

```txt
fix/image-fallback
fix/text-truncation
```

---

### Commit Convention

Use Conventional Commits.

Examples:

```txt
feat(ui): add item card component

feat(tokens): add spacing scale

fix(ui): resolve image fallback issue

test(ui): add item card tests

docs(storybook): add flagged state story

chore(ci): configure npm release workflow
```

---

# Build Strategy

Build order must respect package dependencies.

Dependency flow:

```txt
tokens
  ↓
ui
  ↓
storybook
```

---

## Build Outputs

Each package should generate:

```txt
dist/
  index.js
  index.mjs
  index.d.ts
```

Requirements:

* ESM output
* CommonJS output
* TypeScript declarations

Build artifacts must never be committed.

---

## Build Tool

Use:

```txt
tsup
```

Example outputs:

```txt
packages/tokens/dist
packages/ui/dist
```

---

# Monorepo Scripts

Root package.json should expose:

```json
{
  "dev": "turbo run dev",
  "build": "turbo run build",
  "lint": "turbo run lint",
  "test": "turbo run test",
  "typecheck": "turbo run typecheck",
  "clean": "turbo run clean",
  "storybook": "pnpm --filter storybook dev",
  "build-storybook": "pnpm --filter storybook build"
}
```

---

## Package Scripts

### tokens

```json
{
  "build": "tsup",
  "typecheck": "tsc --noEmit",
  "lint": "eslint src",
  "clean": "rimraf dist"
}
```

### ui

```json
{
  "build": "tsup",
  "typecheck": "tsc --noEmit",
  "lint": "eslint src",
  "test": "vitest",
  "clean": "rimraf dist"
}
```

### storybook

```json
{
  "dev": "storybook dev -p 6006",
  "build": "storybook build"
}
```

---

# Packaging

Packages must be independently publishable.

Expected packages:

```txt
@vacacode/tokens
@vacacode/ui
```

Requirements:

* ESM support
* CommonJS support
* Type declarations
* Tree-shakeable exports

Build tool:

```txt
tsup
```

---

# Release Strategy

Use Changesets for versioning and release management.

Required workflow:

```bash
pnpm changeset
```

```bash
pnpm changeset version
```

```bash
pnpm changeset publish
```

Package versions must never be edited manually.

---

# CI/CD

Every Pull Request must execute:

```txt
lint
typecheck
test
build
```

No Pull Request should be merged if any of these checks fail.

---

## Main Branch

Every merge into main should trigger:

1. Package build
2. Automated tests
3. Package release (when applicable)
4. Storybook deployment

---

## Storybook Deployment

Storybook should be deployed automatically from the main branch.

Storybook is the public documentation portal of the Design System.

Deployment targets may include:

* GitHub Pages
* Vercel
* Netlify

Storybook should always reflect the latest released components.

---

# Definition of Done

A component is considered complete only when:

* Implementation exists
* Types are defined
* Tokens are consumed
* Stories are created
* Tests are passing
* Public exports are configured
* Accessibility requirements are met
* CI checks are passing

---

# Decision Framework

When multiple valid solutions exist:

1. Prefer simplicity.
2. Prefer maintainability.
3. Prefer composition over inheritance.
4. Prefer explicitness over magic.
5. Avoid premature abstraction.
6. Avoid over-engineering.

The objective is to demonstrate strong Design System architecture and sound engineering judgment, not maximum feature count.

---

# Resources

- [React Native Docs](https://reactnative.dev/)
- [Storybook React Native Docs](https://storybook.js.org/docs/react-native/get-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
