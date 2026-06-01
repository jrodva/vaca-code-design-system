import React, { useEffect, useRef } from 'react'
import { Animated, View, type ViewStyle } from 'react-native'
import { skeletonStyles } from './Skeleton.styles'

interface SkeletonProps {
  width?: number | string
  height: number
  style?: ViewStyle
}

export const Skeleton = React.memo<SkeletonProps>(({ width = '100%', height, style }) => {
  const shimmer = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start()
  }, [shimmer])

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] })

  return (
    <View
      style={[skeletonStyles.base, { width: width as ViewStyle['width'], height }, style]}
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
    >
      <Animated.View style={[skeletonStyles.shimmer, { opacity }]} />
    </View>
  )
})

Skeleton.displayName = 'Skeleton'
