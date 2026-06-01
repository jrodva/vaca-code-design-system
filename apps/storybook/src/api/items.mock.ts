import type { FetchItemsParams, Item, ItemsPage } from './items'

const CATEGORIES = ['Transfers', 'Payments', 'Subscriptions', 'Refunds', 'Fees']
const MERCHANTS = [
  'Acme Corp',
  'Global Bank',
  'TechStore',
  'Coffee & Co',
  'Monthly Services',
  'Online Shop',
  'Insurance Ltd',
  'Utility Provider',
  'A very long merchant name that should be truncated in the card view',
]

export function generateMockItems(count: number): Item[] {
  return Array.from({ length: count }, (_, i) => {
    const isInbound = i % 2 === 0
    const isConfirmed = i % 3 !== 0
    const isFlagged = i % 7 === 0
    const hasImage = i % 4 !== 0

    return {
      id: `item-${i}`,
      type: isInbound ? 'inbound' : 'outbound',
      status: isConfirmed ? 'confirmed' : 'pending',
      amount: {
        value: Math.round((Math.random() * 1000 + 1) * 100) / 100,
        currency: 'EUR',
      },
      label: {
        name: MERCHANTS[i % MERCHANTS.length],
        imageUrl: hasImage ? `https://picsum.photos/seed/${i}/40/40` : null,
      },
      category: CATEGORIES[i % CATEGORIES.length],
      date: new Date(Date.now() - i * 86_400_000).toISOString(),
      flagged: isFlagged,
    }
  })
}

const ALL_ITEMS = generateMockItems(200)

export async function mockFetchItems(
  params: FetchItemsParams,
  options: { delay?: number } = {}
): Promise<ItemsPage> {
  const { cursor, limit = 20 } = params
  const { delay = 0 } = options

  if (delay > 0) {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), delay))
  }

  const startIndex = cursor
    ? ALL_ITEMS.findIndex((item) => item.id === cursor) + 1
    : 0

  const pageItems = ALL_ITEMS.slice(startIndex, startIndex + limit)
  const lastItem = pageItems[pageItems.length - 1]
  const hasMore = startIndex + limit < ALL_ITEMS.length

  return {
    items: pageItems,
    nextCursor: hasMore && lastItem ? lastItem.id : null,
  }
}
