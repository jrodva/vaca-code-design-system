import { StyleSheet } from 'react-native'
import { colors, spacing, radius, typography } from '@vacacode/tokens'

export const badgeStyles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  pending: {
    backgroundColor: colors.semantic.status.pending.background,
    borderWidth: 1,
    borderColor: colors.semantic.status.pending.border,
  },
  confirmed: {
    backgroundColor: colors.semantic.status.confirmed.background,
    borderWidth: 1,
    borderColor: colors.semantic.status.confirmed.border,
  },
  text: {
    fontSize: typography.fontSizes.xs,
    fontWeight: typography.fontWeights.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pendingText: {
    color: colors.semantic.status.pending.text,
  },
  confirmedText: {
    color: colors.semantic.status.confirmed.text,
  },
})
