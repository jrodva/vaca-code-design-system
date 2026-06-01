export type BadgeVariant = 'pending' | 'confirmed'

export interface BadgeProps {
  variant: BadgeVariant
  label?: string
}
