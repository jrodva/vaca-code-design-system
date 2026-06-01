import { StyleSheet } from 'react-native'
import { radius, colors } from '@vacacode/tokens'

export const skeletonStyles = StyleSheet.create({
  base: {
    backgroundColor: colors.foundation.neutral[200],
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.foundation.neutral[100],
    opacity: 0.6,
  },
})
