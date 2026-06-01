# @vacacode/ui

React Native UI component library for the Vacacode Design System. Built with TypeScript, token-driven, and optimised for performance in virtualized lists.

## Requirements

- React Native >= 0.76
- React >= 18.3

## Installation

```sh
npm install @vacacode/ui @vacacode/tokens
# or
pnpm add @vacacode/ui @vacacode/tokens
```

> `@vacacode/tokens` is a required peer dependency — all visual values are sourced from it.

---

## Components

### ItemCard

The primary component of the design system. Represents a single transaction or item with support for variants, statuses, flagging, image thumbnails, and loading states.

```tsx
import { ItemCard } from '@vacacode/ui'

<ItemCard
  variant="inbound"
  status="confirmed"
  label="Transfer from Savings"
  subtitle="Savings Account •• 4821"
  imageUri="https://example.com/avatar.png"
/>
```

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `'inbound' \| 'outbound'` | Yes | — | Controls the accent color on the left border |
| `status` | `'pending' \| 'confirmed'` | Yes | — | Displayed as a badge |
| `label` | `string` | Yes | — | Primary text. Truncated to one line |
| `subtitle` | `string` | No | — | Secondary text. Truncated to one line |
| `imageUri` | `string` | No | — | Image URL for the thumbnail. Falls back to initials if missing or on error |
| `flagged` | `boolean` | No | `false` | Renders a flag indicator and highlights the card border |
| `loading` | `boolean` | No | `false` | Replaces content with an animated skeleton |
| `onPress` | `() => void` | No | — | Makes the card pressable |
| `accessibilityLabel` | `string` | No | auto-generated | Overrides the default accessibility label |

#### Variants

**`inbound`** — blue left accent (`#0055FF`). Use for incoming transactions (deposits, transfers in).

**`outbound`** — orange left accent (`#FF6600`). Use for outgoing transactions (payments, transfers out).

#### Statuses

**`confirmed`** — green badge. Transaction has been processed.

**`pending`** — yellow badge. Transaction is awaiting processing.

#### States

```tsx
// Flagged — red border highlight and flag icon
<ItemCard variant="inbound" status="pending" label="Suspicious Transfer" flagged />

// Loading skeleton
<ItemCard variant="inbound" status="confirmed" label="" loading />

// Image fallback — shows initials when imageUri is missing or fails to load
<ItemCard variant="outbound" status="confirmed" label="ATM Withdrawal" />

// Pressable
<ItemCard
  variant="inbound"
  status="confirmed"
  label="Refund from Amazon"
  onPress={() => navigation.navigate('TransactionDetail')}
/>
```

#### Dimensions

The card renders at `width: 390` with `maxWidth: 450`. Both `label` and `subtitle` are clamped to one line with tail ellipsis.

---

### Badge

Status badge used internally by `ItemCard`. Available for standalone use.

```tsx
import { Badge } from '@vacacode/ui'

<Badge variant="pending" />
<Badge variant="confirmed" />
<Badge variant="confirmed" label="Paid" />  // custom label
```

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `'pending' \| 'confirmed'` | Yes | — | Controls colors |
| `label` | `string` | No | variant name | Overrides the displayed text |

---

### Thumbnail

Image with automatic fallback to initials. Used internally by `ItemCard`.

```tsx
import { Thumbnail } from '@vacacode/ui'

<Thumbnail uri="https://example.com/img.png" fallbackLabel="John Doe" size={48} />
```

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `uri` | `string` | No | — | Image URL |
| `fallbackLabel` | `string` | No | — | Used to derive initials when image is absent or fails |
| `size` | `number` | No | `48` | Width and height in dp |

---

### Skeleton

Animated loading placeholder with a shimmer effect. Used internally by `ItemCard`.

```tsx
import { Skeleton } from '@vacacode/ui'

<Skeleton height={16} width="60%" />
<Skeleton height={48} width={48} />
```

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `height` | `number` | Yes | — | Height in dp |
| `width` | `number \| string` | No | `'100%'` | Width in dp or percentage string |

---

## Architecture

Components follow **Atomic Design** — atoms compose into molecules:

```
atoms/
  Badge/
  Skeleton/
  Thumbnail/

molecules/
  ItemCard/      ← composes Badge + Skeleton + Thumbnail
```

All visual values come from `@vacacode/tokens`. No hardcoded colors, spacing, or typography inside components.

---

## Performance

All components are wrapped in `React.memo`. `ItemCard` is safe to render inside `FlatList` and `FlashList` without additional memoization on the consumer side, provided props are stable references.
