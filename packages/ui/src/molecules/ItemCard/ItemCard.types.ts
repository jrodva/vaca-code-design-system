export type ItemCardVariant = 'inbound' | 'outbound'
export type ItemCardStatus = 'pending' | 'confirmed'

export interface ItemCardProps {
  variant: ItemCardVariant
  status: ItemCardStatus
  label: string
  subtitle?: string
  imageUri?: string
  flagged?: boolean
  loading?: boolean
  onPress?: () => void
  accessibilityLabel?: string
}
