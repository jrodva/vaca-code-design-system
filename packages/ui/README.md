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

### ItemsList

Virtualized list organism for rendering large collections of `ItemCard` molecules. Built on `@shopify/flash-list` for high-performance recycled rendering, with built-in cursor-based pagination, full-page loading skeletons, footer skeletons for incremental loads, and empty/error states.

#### Additional peer dependency

```sh
npm install @shopify/flash-list
# or
pnpm add @shopify/flash-list
```

#### Basic usage

```tsx
import { ItemsList, type ListItemData } from '@vacacode/ui'

const items: ListItemData[] = [
  {
    id: 'tx-1',
    variant: 'inbound',
    status: 'confirmed',
    label: 'Transfer from Savings',
    subtitle: 'Transfers · 1 Jun 2025',
    imageUri: 'https://example.com/logo.png',
    flagged: false,
  },
]

<ItemsList
  items={items}
  isLoading={false}
  isLoadingMore={false}
  hasNextPage={true}
  onEndReached={loadNextPage}
/>
```

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | `ListItemData[]` | Yes | — | Items to render. Each entry is spread directly onto `ItemCard` |
| `isLoading` | `boolean` | No | `false` | Full-page load — replaces the list with animated skeletons |
| `isLoadingMore` | `boolean` | No | `false` | Next-page load — appends skeleton cards at the bottom of the list |
| `hasNextPage` | `boolean` | No | `false` | Whether more pages are available. Guards `onEndReached` from firing unnecessarily |
| `error` | `Error \| null` | No | — | When set, renders an error message with an optional retry button |
| `onEndReached` | `() => void` | No | — | Called when the user scrolls near the end. Only fires when `hasNextPage && !isLoadingMore` |
| `onRetry` | `() => void` | No | — | Called when the user taps the retry button in the error state |
| `estimatedItemSize` | `number` | No | `80` | Passed to `FlashList`. Set this to your actual card height for best scroll performance |
| `accessibilityLabel` | `string` | No | — | Accessibility label for the list container |

#### `ListItemData` type

`ListItemData` extends `ItemCardProps` with a required `id` field used as the FlashList key:

```ts
import type { ListItemData } from '@vacacode/ui'

// id + all ItemCard props
const item: ListItemData = {
  id: 'tx-1',
  variant: 'inbound',
  status: 'confirmed',
  label: 'Transfer from Savings',
  subtitle: 'Transfers · 1 Jun 2025',
  imageUri: 'https://example.com/logo.png',
  flagged: false,
  onPress: () => navigation.navigate('Detail', { id: 'tx-1' }),
}
```

#### States

```tsx
// Initial load
<ItemsList items={[]} isLoading={true} onEndReached={loadMore} />

// Fetching next page
<ItemsList items={firstPage} isLoadingMore={true} hasNextPage={true} onEndReached={loadMore} />

// Error with retry
<ItemsList items={[]} error={new Error('Network error')} onRetry={refetch} />

// Empty
<ItemsList items={[]} isLoading={false} />
```

#### Pagination pattern

`ItemsList` is a purely presentational component — it owns no data fetching. Wire it to any data source that can provide items and a `loadMore` callback:

```tsx
function TransactionList() {
  const { items, isLoading, isLoadingMore, hasNextPage, loadMore, error, retry } =
    useMyDataSource()

  return (
    <ItemsList
      items={items}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasNextPage={hasNextPage}
      error={error}
      onEndReached={loadMore}
      onRetry={retry}
      estimatedItemSize={80}
    />
  )
}
```

#### Performance notes

- FlashList recycles item views — only visible cards are mounted at any time, regardless of list length.
- `onEndReached` is guarded internally: it only fires when `hasNextPage` is `true` and `isLoadingMore` is `false`, preventing duplicate fetch calls at the end of a page.
- `ItemCard` is wrapped in `React.memo`. Ensure `onPress` callbacks are stable (e.g. defined with `useCallback` or inline on each item object) to avoid unnecessary re-renders.
- Measure your actual card height and pass it as `estimatedItemSize` — the default of `80` matches the standard padding + thumbnail size, but an accurate value improves initial scroll position calculations.

---

### ItemCard

The primary molecule. Represents a single transaction or item with support for variants, statuses, flagging, image thumbnails, and loading states.

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

Components follow **Atomic Design** — atoms compose into molecules, molecules into organisms:

```
atoms/
  Badge/
  Skeleton/
  Thumbnail/

molecules/
  ItemCard/      ← composes Badge + Skeleton + Thumbnail

organisms/
  ItemsList/     ← composes FlashList + ItemCard
```

All visual values come from `@vacacode/tokens`. No hardcoded colors, spacing, or typography inside components.

---

## Performance

All components are wrapped in `React.memo`. `ItemCard` is safe to render inside `FlatList` and `FlashList` without additional memoization on the consumer side, provided props are stable references.

`ItemsList` uses `@shopify/flash-list` for recycled rendering — it maintains a fixed pool of mounted views regardless of how many items are in the list. Pair it with cursor-based pagination and `onEndReached` for lists of any size.
