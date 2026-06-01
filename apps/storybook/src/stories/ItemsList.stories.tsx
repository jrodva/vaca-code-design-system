import type { Decorator, Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ItemsList, type ListItemData } from '@vacacode/ui'
import { mockFetchItems } from '../api/items.mock'
import { useItems } from '../hooks/useItems'

const withQueryClient: Decorator = (Story) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  )
}

const meta: Meta<typeof ItemsList> = {
  title: 'Organisms/ItemsList',
  component: ItemsList,
  decorators: [withQueryClient],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof meta>

const makeItems = (count: number, offset = 0): ListItemData[] =>
  Array.from({ length: count }, (_, i) => {
    const index = offset + i
    const isInbound = index % 2 === 0
    const isConfirmed = index % 3 !== 0
    return {
      id: `item-${index}`,
      variant: isInbound ? 'inbound' : 'outbound',
      status: isConfirmed ? 'confirmed' : 'pending',
      label: `Merchant ${index}`,
      subtitle: `Category · ${new Date(Date.now() - index * 86_400_000).toLocaleDateString('en-GB')}`,
      imageUri: index % 4 !== 0 ? `https://picsum.photos/seed/${index}/40/40` : undefined,
      flagged: index % 7 === 0,
    }
  })

export const Default: Story = {
  args: {
    items: makeItems(10),
    isLoading: false,
    isLoadingMore: false,
    hasNextPage: true,
  },
}

export const Loading: Story = {
  args: {
    items: [],
    isLoading: true,
  },
}

export const LoadingMore: Story = {
  args: {
    items: makeItems(10),
    isLoading: false,
    isLoadingMore: true,
    hasNextPage: true,
  },
}

export const EmptyList: Story = {
  args: {
    items: [],
    isLoading: false,
    isLoadingMore: false,
    hasNextPage: false,
  },
}

export const ErrorState: Story = {
  args: {
    items: [],
    isLoading: false,
    isLoadingMore: false,
    hasNextPage: false,
    error: new Error('Could not load items. Check your connection.'),
  },
}

export const AllVariants: Story = {
  args: {
    items: makeItems(20),
    isLoading: false,
    isLoadingMore: false,
    hasNextPage: false,
  },
}

function WithMockPaginationWrapper() {
  const { items, isLoading, isLoadingMore, hasNextPage, error, loadMore, retry } =
    useItems({ fetchFn: (params) => mockFetchItems(params, { delay: 300 }) })

  return (
    <ItemsList
      items={items}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasNextPage={hasNextPage}
      error={error}
      onEndReached={loadMore}
      onRetry={retry}
    />
  )
}

export const WithMockPagination: Story = {
  render: () => <WithMockPaginationWrapper />,
}
