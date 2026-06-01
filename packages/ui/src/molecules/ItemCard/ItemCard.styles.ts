import { StyleSheet } from 'react-native'
import { colors, spacing, radius, shadows, typography } from '@vacacode/tokens'

const ACCENT_BORDER_WIDTH = 4

export const itemCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.semantic.background.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    width: 390,
    maxWidth: 450,
    ...shadows.md,
  },
  accentBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: ACCENT_BORDER_WIDTH,
    borderTopLeftRadius: radius.lg,
    borderBottomLeftRadius: radius.lg,
  },
  inboundAccent: {
    backgroundColor: colors.component.itemCard.inbound.accent,
  },
  outboundAccent: {
    backgroundColor: colors.component.itemCard.outbound.accent,
  },
  content: {
    flex: 1,
    paddingLeft: spacing.xs,
    gap: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  label: {
    flex: 1,
    fontSize: typography.fontSizes.md,
    fontWeight: typography.fontWeights.semibold,
    color: colors.semantic.text.primary,
  },
  subtitle: {
    flex: 1,
    fontSize: typography.fontSizes.sm,
    color: colors.semantic.text.secondary,
  },
  flagIcon: {
    fontSize: typography.fontSizes.md,
    color: colors.component.itemCard.flagged.icon,
  },
  flaggedContainer: {
    borderWidth: 1,
    borderColor: colors.component.itemCard.flagged.border,
  },
  skeletonContainer: {
    flex: 1,
    gap: spacing.sm,
  },
})
