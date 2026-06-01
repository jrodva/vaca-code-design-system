import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { thumbnailStyles } from './Thumbnail.styles'
import type { ThumbnailProps } from './Thumbnail.types'

const DEFAULT_SIZE = 48

export const Thumbnail = React.memo<ThumbnailProps>(({
  uri,
  fallbackLabel,
  size = DEFAULT_SIZE,
}) => {
  const [hasError, setHasError] = useState(false)
  const showFallback = !uri || hasError
  const initials = fallbackLabel
    ? fallbackLabel.slice(0, 2).toUpperCase()
    : '?'

  return (
    <View
      style={[thumbnailStyles.container, { width: size, height: size }]}
      accessibilityRole="image"
      accessibilityLabel={fallbackLabel ?? 'Item image'}
    >
      {showFallback ? (
        <Text style={thumbnailStyles.fallback}>{initials}</Text>
      ) : (
        <Image
          source={{ uri }}
          style={thumbnailStyles.image}
          onError={() => setHasError(true)}
          accessibilityIgnoresInvertColors
        />
      )}
    </View>
  )
})

Thumbnail.displayName = 'Thumbnail'
