export const colors = {
  /**
   * FOUNDATION TOKENS
   * Raw palette, no meaning attached
   */
  foundation: {
    neutral: {
      0: '#FFFFFF',
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      700: '#374151',
      900: '#111827',
    },

    blue: {
      100: '#E6F0FF',
      300: '#80AAFF',
      500: '#0055FF',
      700: '#0033CC',
    },

    orange: {
      100: '#FFF0E6',
      300: '#FFB380',
      500: '#FF6600',
      700: '#CC4400',
    },

    red: {
      100: '#FEE2E2',
      300: '#FCA5A5',
      500: '#EF4444',
      700: '#B91C1C',
    },

    green: {
      100: '#D1FAE5',
      300: '#6EE7B7',
      500: '#10B981',
      700: '#065F46',
    },

    yellow: {
      100: '#FFF3CD',
      300: '#FDE68A',
      500: '#FACC15',
      700: '#A16207',
    },
  },

  /**
   * SEMANTIC TOKENS
   * Reusable across the whole design system
   * Independent of any specific component or domain
   */
  semantic: {
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
      inverse: '#FFFFFF',
    },

    background: {
      surface: '#FFFFFF',
      subtle: '#F9FAFB',
      muted: '#F3F4F6',
    },

    border: {
      default: '#E5E7EB',
      subtle: '#F3F4F6',
      strong: '#374151',
    },

    status: {
      pending: {
        background: '#FFF3CD',
        text: '#856404',
        border: '#FACC15',
      },

      confirmed: {
        background: '#D1FAE5',
        text: '#065F46',
        border: '#10B981',
      },

      error: {
        background: '#FEE2E2',
        text: '#B91C1C',
        border: '#EF4444',
      },

      success: {
        background: '#D1FAE5',
        text: '#065F46',
        border: '#10B981',
      },
    },

    action: {
      primary: '#0055FF',
      primaryPressed: '#0033CC',
      disabled: '#9CA3AF',
    },
  },

  /**
   * COMPONENT TOKENS
   * Specific to ItemCard domain (safe at this scale)
   * Can be removed or refactored later without affecting system-wide tokens
   */
  component: {
    itemCard: {
      inbound: {
        background: '#E6F0FF',
        accent: '#0055FF',
      },

      outbound: {
        background: '#FFF0E6',
        accent: '#FF6600',
      },

      flagged: {
        background: '#FEE2E2',
        icon: '#EF4444',
        border: '#FCA5A5',
      },
    },
  },
} as const;
