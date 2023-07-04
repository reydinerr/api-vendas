export interface IListProduct {
  totalPage: number
  total: number
  products: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}
