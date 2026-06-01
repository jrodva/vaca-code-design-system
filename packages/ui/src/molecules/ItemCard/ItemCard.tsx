import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Badge, Skeleton, Thumbnail } from '../../atoms'
import { itemCardStyles } from './ItemCard.styles'
import type { ItemCardProps } from './ItemCard.types'

const THUMBNAIL_SIZE = 48

function ItemCardSkeleton() {
  return (
    <View style={[itemCardStyles.container]}>
      <Skeleton width={THUMBNAIL_SIZE} height={THUMBNAIL_SIZE} />
      <View style={itemCardStyles.skeletonContainer}>
        <Skeleton height={16} width="60%" />
        <Skeleton height={12} width="40%" />
      </View>
    </View>
  )
}

export const ItemCard = React.memo<ItemCardProps>(({
  variant,
  status,
  label,
  subtitle,
  imageUri,
  flagged = false,
  loading = false,
  onPress,
  accessibilityLabel,
}) => {
  if (loading) {
    return <ItemCardSkeleton />
  }

  const accentStyle = variant === 'inbound'
    ? itemCardStyles.inboundAccent
    : itemCardStyles.outboundAccent

  const computedAccessibilityLabel = accessibilityLabel
    ?? `${variant} item: ${label}, status ${status}${flagged ? ', flagged' : ''}`

  const Container = onPress ? TouchableOpacity : View

  return (
    <Container
      style={[
        itemCardStyles.container,
        flagged && itemCardStyles.flaggedContainer,
      ]}
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : 'none'}
      accessibilityLabel={computedAccessibilityLabel}
    >
      <View style={[itemCardStyles.accentBorder, accentStyle]} />

      <Thumbnail
        uri={imageUri}
        fallbackLabel={label}
        size={THUMBNAIL_SIZE}
      />

      <View style={itemCardStyles.content}>
        <View style={itemCardStyles.row}>
          <Text
            style={itemCardStyles.label}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {label}
          </Text>
          {flagged && (
            <Text style={itemCardStyles.flagIcon} accessibilityLabel="Flagged">
              🚩
            </Text>
          )}
        </View>

        <View style={itemCardStyles.row}>
          {subtitle ? (
            <Text
              style={itemCardStyles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {subtitle}
            </Text>
          ) : null}
          <Badge variant={status} />
        </View>
      </View>
    </Container>
  )
})

ItemCard.displayName = 'ItemCard'
