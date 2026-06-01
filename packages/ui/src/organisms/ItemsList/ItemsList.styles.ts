import { StyleSheet } from 'react-native'
import { colors, spacing, typography } from '@vacacode/tokens'

export const itemsListStyles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  skeletonContainer: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  footerContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.md,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    color: colors.semantic.text.secondary,
    textAlign: 'center',
  },
  retryText: {
    fontSize: typography.fontSizes.md,
    color: colors.semantic.action.primary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
})
