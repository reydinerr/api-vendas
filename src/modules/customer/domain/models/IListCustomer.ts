export interface IListCustomer {
  totalPage: number
  total: number
  customer: {
    id: string
    name: string
    email: string
    age: number
    cnpj: string
    created_at: Date
    updated_at: Date
  }[]
}
