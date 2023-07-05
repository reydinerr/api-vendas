import { Prisma, Product } from '@prisma/client'
import { IProduct } from '../models/IProduct'
import { IUpdateProduct } from '../models/IUpdateProduct'
import { IListProduct } from '../models/IListProduct'
import { IFindProductId } from '../models/IFindProduct'

export interface SearchParams {
  skip: number
  take: number
}

export interface IProductsRepository {
  create(data: Prisma.ProductCreateInput): Promise<IProduct>
  findById({ id }: IFindProductId): Promise<Product | null>
  //findByName({ name }: IFindProductName): Promise<Product | null>
  remove(id: string): Promise<void>
  update({ id, name, price, quantity }: IUpdateProduct): Promise<Product>
  getAll({ skip, take }: SearchParams): Promise<IListProduct>
}
