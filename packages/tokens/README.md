# @vacacode/tokens

Design tokens for the Vacacode React Native Design System. Framework-agnostic — works with React Native, React Native Web, and any JavaScript environment.

## Installation

```sh
npm install @vacacode/tokens
# or
pnpm add @vacacode/tokens
```

## Usage

```ts
import { colors, spacing, typography, radius, shadows } from '@vacacode/tokens'
```

---

## Token Reference

### Colors

The color system has three layers:

#### `colors.foundation`

Raw palette. No semantic meaning attached. Use these only when defining semantic or component tokens, not directly in components.

| Token | Value |
|---|---|
| `foundation.neutral[0]` | `#FFFFFF` |
| `foundation.neutral[50]` | `#F9FAFB` |
| `foundation.neutral[100]` | `#F3F4F6` |
| `foundation.neutral[200]` | `#E5E7EB` |
| `foundation.neutral[300]` | `#D1D5DB` |
| `foundation.neutral[400]` | `#9CA3AF` |
| `foundation.neutral[500]` | `#6B7280` |
| `foundation.neutral[700]` | `#374151` |
| `foundation.neutral[900]` | `#111827` |
| `foundation.blue[100–700]` | `#E6F0FF` → `#0033CC` |
| `foundation.orange[100–700]` | `#FFF0E6` → `#CC4400` |
| `foundation.red[100–700]` | `#FEE2E2` → `#B91C1C` |
| `foundation.green[100–700]` | `#D1FAE5` → `#065F46` |
| `foundation.yellow[100–700]` | `#FFF3CD` → `#A16207` |

#### `colors.semantic`

Reusable tokens with meaning. Use these in components.

```ts
// Text
colors.semantic.text.primary    // #111827
colors.semantic.text.secondary  // #6B7280
colors.semantic.text.disabled   // #9CA3AF
colors.semantic.text.inverse    // #FFFFFF

// Backgrounds
colors.semantic.background.surface  // #FFFFFF
colors.semantic.background.subtle   // #F9FAFB
colors.semantic.background.muted    // #F3F4F6

// Borders
colors.semantic.border.default  // #E5E7EB
colors.semantic.border.subtle   // #F3F4F6
colors.semantic.border.strong   // #374151

// Status
colors.semantic.status.pending.background   // #FFF3CD
colors.semantic.status.pending.text         // #856404
colors.semantic.status.pending.border       // #FACC15

colors.semantic.status.confirmed.background // #D1FAE5
colors.semantic.status.confirmed.text       // #065F46
colors.semantic.status.confirmed.border     // #10B981

colors.semantic.status.error.background     // #FEE2E2
colors.semantic.status.error.text           // #B91C1C
colors.semantic.status.error.border         // #EF4444

colors.semantic.status.success.background   // #D1FAE5
colors.semantic.status.success.text         // #065F46
colors.semantic.status.success.border       // #10B981

// Actions
colors.semantic.action.primary         // #0055FF
colors.semantic.action.primaryPressed  // #0033CC
colors.semantic.action.disabled        // #9CA3AF
```

#### `colors.component`

Tokens specific to individual components. Scoped to avoid polluting the semantic layer.

```ts
colors.component.itemCard.inbound.background   // #E6F0FF
colors.component.itemCard.inbound.accent       // #0055FF

colors.component.itemCard.outbound.background  // #FFF0E6
colors.component.itemCard.outbound.accent      // #FF6600

colors.component.itemCard.flagged.background   // #FEE2E2
colors.component.itemCard.flagged.icon         // #EF4444
colors.component.itemCard.flagged.border       // #FCA5A5
```

---

### Spacing

```ts
import { spacing } from '@vacacode/tokens'

spacing.xs   // 4
spacing.sm   // 8
spacing.md   // 16
spacing.lg   // 24
spacing.xl   // 32
spacing.xxl  // 48
```

---

### Typography

```ts
import { typography } from '@vacacode/tokens'

// Font sizes
typography.fontSizes.xs   // 10
typography.fontSizes.sm   // 12
typography.fontSizes.md   // 14
typography.fontSizes.lg   // 16
typography.fontSizes.xl   // 18
typography.fontSizes.xxl  // 24

// Font weights
typography.fontWeights.regular   // '400'
typography.fontWeights.medium    // '500'
typography.fontWeights.semibold  // '600'
typography.fontWeights.bold      // '700'

// Line heights
typography.lineHeights.tight    // 16
typography.lineHeights.normal   // 20
typography.lineHeights.relaxed  // 24
```

---

### Radius

```ts
import { radius } from '@vacacode/tokens'

radius.sm    // 4
radius.md    // 8
radius.lg    // 12
radius.xl    // 16
radius.full  // 9999
```

---

### Shadows

Shadows include both iOS (`shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius`) and Android (`elevation`) properties.

```ts
import { shadows } from '@vacacode/tokens'

// Spread directly into StyleSheet
const styles = StyleSheet.create({
  card: {
    ...shadows.sm,  // elevation: 1
    ...shadows.md,  // elevation: 2
    ...shadows.lg,  // elevation: 4
  },
})
```

---

## Design Principles

- **Foundation → Semantic → Component**: consume tokens at the highest layer applicable. Components should use `semantic` or `component` tokens, never `foundation` directly.
- **No hardcoded values**: all visual decisions (color, spacing, radius, shadow, typography) must come from this package.
- **Framework-agnostic**: tokens are plain JavaScript objects with no React Native or browser dependencies.
