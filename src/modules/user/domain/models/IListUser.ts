export interface IListUser {
  totalPage: number
  total: number
  user: {
    id: string
    name: string
    email: string
    password?: string
    cpf: string
    age: number
  }[]
}
