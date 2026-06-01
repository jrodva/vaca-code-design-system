# Vacacode Design System

A React Native Design System implemented as a monorepo. Provides reusable, token-driven UI components for cross-platform mobile applications, published as independent npm packages.

## Packages

| Package | Description | Version |
|---|---|---|
| [`@vacacode/tokens`](./packages/tokens) | Design tokens — colors, spacing, typography, radius, shadows | ![npm](https://img.shields.io/npm/v/@vacacode/tokens) |
| [`@vacacode/ui`](./packages/ui) | React Native component library | ![npm](https://img.shields.io/npm/v/@vacacode/ui) |

## Repository Structure

```
design-system/
├── apps/
│   └── storybook/          # Component development environment
│
├── packages/
│   ├── tokens/             # @vacacode/tokens
│   └── ui/                 # @vacacode/ui
│
├── .github/
│   └── workflows/
│       ├── ci.yml          # Typecheck, test, build on every PR
│       ├── release.yml     # Automated npm release via Changesets
│       └── storybook.yml   # Storybook deployment
│
├── turbo.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## Component Architecture

Components follow **Atomic Design** principles. Dependencies flow strictly downward — no layer may import from a layer above it.

```
@vacacode/tokens
      ↓
    atoms          Badge · Skeleton · Thumbnail
      ↓
  molecules        ItemCard
      ↓
  organisms        ItemsList
```

All visual values (colors, spacing, typography, radius, shadows) originate from `@vacacode/tokens`. Components never hardcode visual decisions.

---

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm 9

### Install dependencies

```sh
pnpm install
```

### Development — Storybook

Storybook is the primary development environment. Build and validate components here before they are consumed by any application.

```sh
pnpm storybook
```

Storybook runs at `http://localhost:6006`.

### Run all checks

```sh
pnpm build       # Build all packages in dependency order
pnpm test        # Run all tests
pnpm typecheck   # Run TypeScript checks across all packages
pnpm clean       # Remove build artifacts
```

---

## Packages

### `@vacacode/tokens`

Framework-agnostic design tokens. The single source of truth for all visual decisions.

```sh
pnpm add @vacacode/tokens
```

```ts
import { colors, spacing, typography, radius, shadows } from '@vacacode/tokens'
```

See [`packages/tokens/README.md`](./packages/tokens/README.md) for the full token reference.

---

### `@vacacode/ui`

React Native component library. Requires `@vacacode/tokens` as a peer dependency.

```sh
pnpm add @vacacode/ui @vacacode/tokens
```

```tsx
import { ItemsList, ItemCard } from '@vacacode/ui'
```

**Components:**

- **`ItemsList`** — virtualized list organism built on `@shopify/flash-list`. Supports cursor-based infinite scroll, full-page loading skeletons, footer skeletons, and error/empty states. Purely presentational — wire it to any data source.
- **`ItemCard`** — molecule representing a single transaction. Supports `inbound`/`outbound` variants, `pending`/`confirmed` statuses, flagged state, image thumbnail with initials fallback, and animated loading skeleton.
- **`Badge`** — status indicator atom used by `ItemCard`.
- **`Thumbnail`** — image with initials fallback atom used by `ItemCard`.
- **`Skeleton`** — animated shimmer placeholder atom used by `ItemCard`.

See [`packages/ui/README.md`](./packages/ui/README.md) for full API documentation.

---

## CI/CD

Every pull request runs:

| Check | Tool |
|---|---|
| Typecheck | `tsc --noEmit` |
| Tests | Vitest |
| Build | tsup |

No pull request is merged if any check fails.

### Releases

Releases are automated with [Changesets](https://github.com/changesets/changesets). On every merge to `main`, the release workflow either opens a versioning PR or publishes changed packages to npm — depending on whether a changeset is present.

```sh
pnpm changeset          # Describe your change
pnpm changeset version  # Bump versions (handled by CI)
pnpm changeset publish  # Publish to npm (handled by CI)
```

### Storybook deployment

Storybook is deployed automatically on every merge to `main` and serves as the public documentation portal for the design system.

---

## Contributing

### Branch strategy

| Pattern | Purpose |
|---|---|
| `feature/<name>` | New components or features |
| `fix/<name>` | Bug fixes |

### Commit convention

This repository uses [Conventional Commits](https://www.conventionalcommits.org):

```
feat(ui): add item list organism
fix(ui): resolve image fallback issue
test(ui): add item card tests
docs(storybook): add flagged state story
chore(ci): configure npm release workflow
```

### Definition of done

A component is complete only when:

- Implementation exists with strict TypeScript types
- All visual values come from `@vacacode/tokens`
- Stories cover all variants, states, and edge cases
- Tests validate observable behavior
- Public exports are configured in the package index
- Accessibility attributes are in place
- All CI checks pass

---

## Tech Stack

| Concern | Tool |
|---|---|
| Language | TypeScript 5 (strict) |
| UI framework | React Native 0.76 |
| Monorepo | pnpm workspaces + Turborepo |
| Build | tsup (ESM + CJS + `.d.ts`) |
| Testing | Vitest + @testing-library/react |
| Documentation | Storybook 8 (react-vite) |
| Versioning | Changesets |
| CI | GitHub Actions |
