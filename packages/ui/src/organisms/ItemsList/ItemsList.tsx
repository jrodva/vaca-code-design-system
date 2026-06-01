import { memo, useCallback } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { ItemCard } from '../../molecules'
import { itemsListStyles as styles } from './ItemsList.styles'
import type { ItemsListProps, ListItemData } from './ItemsList.types'
import { mapItemToCardProps } from './ItemsList.utils'

const SKELETON_COUNT = 8
const FOOTER_SKELETON_COUNT = 3
const DEFAULT_ESTIMATED_ITEM_SIZE = 80

const LoadingSkeleton = memo(function LoadingSkeleton() {
  return (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <ItemCard
          key={`loading-skeleton-item-${i}`}
          loading
          variant="inbound"
          status="pending"
          label=""
        />
      ))}
    </View>
  )
})

const FooterSkeletons = memo(function FooterSkeletons() {
  return (
    <View style={styles.footerContainer}>
      {Array.from({ length: FOOTER_SKELETON_COUNT }).map((_, i) => (
        <ItemCard
          key={`footer-skeleton-item-${i}`}
          loading
          variant="inbound"
          status="pending"
          label=""
        />
      ))}
    </View>
  )
})

const EmptyState = memo(function EmptyState({
  error,
  onRetry,
}: {
  error?: Error | null
  onRetry?: () => void
}) {
  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{error.message}</Text>
        {onRetry && (
          <TouchableOpacity onPress={onRetry} accessibilityRole="button">
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No items found</Text>
    </View>
  )
})

export const ItemsList = memo(function ItemsList({
  items,
  isLoading = false,
  isLoadingMore = false,
  hasNextPage = false,
  error,
  onEndReached,
  onRetry,
  estimatedItemSize = DEFAULT_ESTIMATED_ITEM_SIZE,
  accessibilityLabel,
}: ItemsListProps) {
  const renderItem = useCallback(
    ({ item }: { item: ListItemData }) => (
      <ItemCard {...mapItemToCardProps(item)} />
    ),
    []
  )

  const keyExtractor = useCallback((item: ListItemData) => item.id, [])

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isLoadingMore) {
      onEndReached?.()
    }
  }, [hasNextPage, isLoadingMore, onEndReached])

  const ListFooterComponent = isLoadingMore ? <FooterSkeletons /> : null

  const ListEmptyComponent = (
    <EmptyState error={error} onRetry={onRetry} />
  )

  if (isLoading) {
    return (
      <ScrollView
        style={styles.listContainer}
        accessibilityLabel={accessibilityLabel}
      >
        <LoadingSkeleton />
      </ScrollView>
    )
  }

  return (
    <FlashList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      estimatedItemSize={estimatedItemSize}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      accessibilityLabel={accessibilityLabel}
      style={styles.listContainer}
    />
  )
})

ItemsList.displayName = 'ItemsList'
