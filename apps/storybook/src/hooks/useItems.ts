import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { ListItemData } from '@vacacode/ui'
import type { FetchItemsFn } from '../api/items'
import { itemToListItemData } from '../utils/itemToListItemData'

interface UseItemsOptions {
  fetchFn: FetchItemsFn
  limit?: number
}

export interface UseItemsResult {
  items: ListItemData[]
  isLoading: boolean
  isLoadingMore: boolean
  hasNextPage: boolean
  error: Error | null
  loadMore: () => void
  retry: () => void
}

export function useItems({ fetchFn, limit = 20 }: UseItemsOptions): UseItemsResult {
  const query = useInfiniteQuery({
    queryKey: ['items', limit],
    queryFn: ({ pageParam }) =>
      fetchFn({ cursor: pageParam as string | undefined, limit }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    // Data is considered fresh for 1 minute; after that React Query re-fetches
    // in the background while the user continues to see cached data (SWR).
    staleTime: 60_000,
  })

  const items = useMemo(
    () => query.data?.pages.flatMap((page) => page.items.map(itemToListItemData)) ?? [],
    [query.data]
  )

  return {
    items,
    isLoading: query.isLoading,
    isLoadingMore: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    error: query.error as Error | null,
    loadMore: () => {
      if (query.hasNextPage && !query.isFetchingNextPage) {
        void query.fetchNextPage()
      }
    },
    retry: () => void query.refetch(),
  }
}
