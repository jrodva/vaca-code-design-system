import type { ItemCardProps } from '../../molecules'

export interface ListItemData extends ItemCardProps {
  id: string
}

export interface ItemsListProps {
  items: ListItemData[]
  isLoading?: boolean
  isLoadingMore?: boolean
  hasNextPage?: boolean
  error?: Error | null
  onEndReached?: () => void
  onRetry?: () => void
  estimatedItemSize?: number
  accessibilityLabel?: string
}
