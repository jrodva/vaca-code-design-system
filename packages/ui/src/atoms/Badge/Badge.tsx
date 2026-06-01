import React from 'react'
import { View, Text } from 'react-native'
import { badgeStyles } from './Badge.styles'
import type { BadgeProps } from './Badge.types'

const LABELS: Record<BadgeProps['variant'], string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
}

export const Badge = React.memo<BadgeProps>(({ variant, label }) => {
  const displayLabel = label ?? LABELS[variant]

  return (
    <View
      style={[badgeStyles.base, badgeStyles[variant]]}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${displayLabel}`}
    >
      <Text style={[badgeStyles.text, badgeStyles[`${variant}Text`]]}>
        {displayLabel}
      </Text>
    </View>
  )
})

Badge.displayName = 'Badge'
