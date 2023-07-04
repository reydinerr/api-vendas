import { Product } from '@prisma/client'
import { ICreateProduct } from '../models/ICreateProduct'
import { IProduct } from '../models/IProduct'
import { IUpdateProduct } from '../models/IUpdateProduct'
import { IListProduct } from '../models/IListProduct'
import { IFindProduct } from '../models/IFindProduct'

export interface SearchParams {
  skip: number
  take: number
}

export interface IProductsRepository {
  create(data: ICreateProduct): Promise<IProduct>
  findById({ id }: IFindProduct): Promise<Product | null>
  findByName(name: string): Promise<Product | null>
  remove(id: string): Promise<void>
  update({ id, data }: IUpdateProduct): Promise<Product>
  getAll({ skip, take }: SearchParams): Promise<IListProduct>
}
