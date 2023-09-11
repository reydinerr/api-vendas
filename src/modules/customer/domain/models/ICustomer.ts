export interface ICustomer {
  id: string
  name: string
  email: string
  password?: string
  age: number
  cnpj: string
  created_at: Date
  updated_at: Date
}

export interface ICustomerReturn {
  id: string
  name: string
  email: string
  age: number
  cnpj: string
  created_at: Date
  updated_at: Date
}
