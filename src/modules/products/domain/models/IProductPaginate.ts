import { IProduct } from './IProduct'

export interface IProductPaginate {
  total: number
  products: IProduct
  data: IProduct[]
}
