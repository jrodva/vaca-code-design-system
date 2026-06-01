import { describe, expect, it } from 'vitest'
import { mapItemToCardProps } from './ItemsList.utils'
import type { ListItemData } from './ItemsList.types'

const baseItem: ListItemData = {
  id: 'item-1',
  variant: 'inbound',
  status: 'confirmed',
  label: 'Acme Corp',
  subtitle: 'Transfers · 1 Jan 2024',
  imageUri: 'https://example.com/logo.png',
  flagged: false,
}

describe('mapItemToCardProps', () => {
  it('strips id from the output', () => {
    const result = mapItemToCardProps(baseItem)
    expect(result).not.toHaveProperty('id')
  })

  it('passes all ItemCard props through unchanged', () => {
    const result = mapItemToCardProps(baseItem)
    expect(result).toEqual({
      variant: 'inbound',
      status: 'confirmed',
      label: 'Acme Corp',
      subtitle: 'Transfers · 1 Jan 2024',
      imageUri: 'https://example.com/logo.png',
      flagged: false,
    })
  })

  it('handles optional props being undefined', () => {
    const minimalItem: ListItemData = {
      id: 'item-2',
      variant: 'outbound',
      status: 'pending',
      label: 'Bank Transfer',
    }
    const result = mapItemToCardProps(minimalItem)
    expect(result).not.toHaveProperty('id')
    expect(result.variant).toBe('outbound')
    expect(result.status).toBe('pending')
    expect(result.label).toBe('Bank Transfer')
  })

  it('preserves flagged state', () => {
    const flaggedItem: ListItemData = { ...baseItem, flagged: true }
    const result = mapItemToCardProps(flaggedItem)
    expect(result.flagged).toBe(true)
  })
})
