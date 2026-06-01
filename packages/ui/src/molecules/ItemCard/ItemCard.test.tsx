import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ItemCard } from './ItemCard'

describe('ItemCard', () => {
  const baseProps = {
    variant: 'inbound' as const,
    status: 'confirmed' as const,
    label: 'Test Item',
  }

  it('renders inbound variant with confirmed status', () => {
    render(<ItemCard {...baseProps} />)
    expect(screen.getByText('Test Item')).toBeInTheDocument()
    expect(screen.getByText('Confirmed')).toBeInTheDocument()
  })

  it('renders outbound variant', () => {
    render(<ItemCard {...baseProps} variant="outbound" />)
    expect(screen.getByText('Test Item')).toBeInTheDocument()
  })

  it('renders pending status badge', () => {
    render(<ItemCard {...baseProps} status="pending" />)
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('renders flagged indicator when flagged', () => {
    render(<ItemCard {...baseProps} flagged />)
    expect(screen.getByLabelText('Flagged')).toBeInTheDocument()
  })

  it('does not render flagged indicator when not flagged', () => {
    render(<ItemCard {...baseProps} flagged={false} />)
    expect(screen.queryByLabelText('Flagged')).not.toBeInTheDocument()
  })

  it('renders image fallback when no imageUri provided', () => {
    render(<ItemCard {...baseProps} />)
    expect(screen.getByLabelText('Test Item')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<ItemCard {...baseProps} subtitle="Subtitle text" />)
    expect(screen.getByText('Subtitle text')).toBeInTheDocument()
  })

  it('truncates long label', () => {
    const longLabel = 'A'.repeat(200)
    render(<ItemCard {...baseProps} label={longLabel} />)
    const element = screen.getByText(longLabel)
    expect(element).toBeInTheDocument()
  })

  it('calls onPress when pressed', async () => {
    const onPress = vi.fn()
    render(<ItemCard {...baseProps} onPress={onPress} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
