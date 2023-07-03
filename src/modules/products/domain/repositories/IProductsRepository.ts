import { Product } from '@prisma/client'
import { ICreateProduct } from '../models/ICreateProduct'
import { IProduct } from '../models/IProduct'
import { IUpdateProduct } from '../models/IUpdateProduct'
import { IProductPaginate } from '../models/IProductPaginate'

export type SearchParams = {
  page: number
  skip: number
  take: number
}

export interface IProductsRepository {
  create(data: ICreateProduct): Promise<IProduct>
  findById(id: string): Promise<Product | null>
  findByName(name: string): Promise<Product | null>
  remove({ id }: Product): Promise<void>
  update({ id, name, price, quantity }: IUpdateProduct): Promise<Product>
  findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate>
}
