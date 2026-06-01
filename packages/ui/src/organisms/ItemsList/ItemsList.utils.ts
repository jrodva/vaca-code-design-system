import type { ItemCardProps } from '../../molecules'
import type { ListItemData } from './ItemsList.types'

export function mapItemToCardProps({ id: _id, ...props }: ListItemData): ItemCardProps {
  return props
}
