import { StyleSheet } from 'react-native'
import { colors, radius, typography } from '@vacacode/tokens'

export const thumbnailStyles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.foundation.neutral[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallback: {
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.semantic.text.secondary,
    textTransform: 'uppercase',
  },
})
