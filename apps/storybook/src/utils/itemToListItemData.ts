import type { ListItemData } from '@vacacode/ui'
import type { Item } from '../api/items'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

export function itemToListItemData(item: Item): ListItemData {
  return {
    id: item.id,
    variant: item.type,
    status: item.status,
    label: item.label.name,
    subtitle: `${item.category} · ${formatDate(item.date)}`,
    imageUri: item.label.imageUrl ?? undefined,
    flagged: item.flagged,
  }
}
