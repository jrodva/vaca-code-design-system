import type { Meta, StoryObj } from '@storybook/react'
import { ItemCard } from '@vacacode/ui'

const meta: Meta<typeof ItemCard> = {
  title: 'Molecules/ItemCard',
  component: ItemCard,
  tags: ['autodocs'],
  args: {
    variant: 'inbound',
    status: 'confirmed',
    label: 'Transfer from Savings',
    subtitle: 'Savings Account •• 4821',
    imageUri: 'https://picsum.photos/seed/item/48/48',
    flagged: false,
    loading: false,
  },
  argTypes: {
    variant: { control: 'radio', options: ['inbound', 'outbound'] },
    status: { control: 'radio', options: ['pending', 'confirmed'] },
    flagged: { control: 'boolean' },
    loading: { control: 'boolean' },
    onPress: { action: 'pressed' },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const InboundConfirmed: Story = {
  args: {
    variant: 'inbound',
    status: 'confirmed',
    label: 'Transfer from Savings',
    subtitle: 'Savings Account •• 4821',
  },
}

export const InboundPending: Story = {
  args: {
    variant: 'inbound',
    status: 'pending',
    label: 'Direct Deposit',
    subtitle: 'Payroll • Acme Corp',
  },
}

export const OutboundConfirmed: Story = {
  args: {
    variant: 'outbound',
    status: 'confirmed',
    label: 'Payment to Netflix',
    subtitle: 'Checking Account •• 3302',
  },
}

export const OutboundPending: Story = {
  args: {
    variant: 'outbound',
    status: 'pending',
    label: 'Wire Transfer',
    subtitle: 'External Bank •• 7714',
  },
}

export const Flagged: Story = {
  args: {
    variant: 'outbound',
    status: 'pending',
    label: 'Suspicious Transfer',
    subtitle: 'Unknown Recipient •• 9900',
    flagged: true,
  },
}

export const LongLabel: Story = {
  args: {
    variant: 'inbound',
    status: 'confirmed',
    label: 'International Wire Transfer — Currency Conversion USD to EUR, Priority Processing, Correspondent Bank Fee Applied',
    subtitle: 'Deutsche Bank Frankfurt IBAN DE89 3704 0044 0532 0130 00',
  },
}

export const MissingImage: Story = {
  args: {
    variant: 'outbound',
    status: 'confirmed',
    label: 'ATM Withdrawal',
    subtitle: 'Checking Account •• 3302',
    imageUri: undefined,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Pressable: Story = {
  args: {
    variant: 'inbound',
    status: 'confirmed',
    label: 'Refund from Amazon',
    subtitle: 'Checking Account •• 3302',
    onPress: () => alert('Transaction pressed!'),
  },
}
