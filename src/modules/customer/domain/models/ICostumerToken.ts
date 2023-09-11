export interface ICustomerToken {
  id: string
  token: string
  customer_id: string
  created_at: Date
  updated_at: Date
}

export interface ICreateCustomerToken {
  id: string
  token: string
  customer_id: string
  created_at: Date
  updated_at: Date
}

export interface ICustomerTokenId {
  id: string
}
