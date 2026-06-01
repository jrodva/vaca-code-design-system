// Hand-written from GET /items OpenAPI contract.
// Rationale: single endpoint, stable shape — codegen overhead not justified.
export type ItemType = 'inbound' | 'outbound'
export type ItemStatus = 'pending' | 'confirmed'

export interface ItemAmount {
  value: number
  currency: string
}

export interface ItemLabel {
  name: string
  imageUrl: string | null
}

export interface Item {
  id: string
  type: ItemType
  status: ItemStatus
  amount: ItemAmount
  label: ItemLabel
  category: string
  date: string // ISO 8601
  flagged: boolean
}

export interface ItemsPage {
  items: Item[]
  nextCursor: string | null
}

export interface FetchItemsParams {
  cursor?: string
  limit?: number
}

export type FetchItemsFn = (params: FetchItemsParams) => Promise<ItemsPage>
