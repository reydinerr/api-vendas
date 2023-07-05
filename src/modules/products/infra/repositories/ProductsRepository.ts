import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct'
import { IFindProductId } from '@modules/products/domain/models/IFindProduct'
import { IListProduct } from '@modules/products/domain/models/IListProduct'
import { IUpdateProduct } from '@modules/products/domain/models/IUpdateProduct'
import {
  IProductsRepository,
  SearchParams,
} from '@modules/products/domain/repositories/IProductsRepository'
import { PrismaClient, Product } from '@prisma/client'

export class ProductsRepository implements IProductsRepository {
  private prisma = new PrismaClient()

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = await this.prisma.product.create({
      data: {
        name,
        price,
        quantity,
      },
    })

    return product
  }

  public async findById({ id }: IFindProductId): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    })

    return product
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        name,
      },
    })
    return product
  }

  public async getAll({ skip, take }: SearchParams): Promise<IListProduct> {
    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          quantity: true,
        },
        skip,
        take,
      }),
      this.prisma.product.count(),
    ])

    const totalPage = Math.ceil(total / take)
    const result = { totalPage, total, products }

    return result
  }

  public async update({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        quantity,
      },
    })
    return product
  }

  public async remove(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id,
      },
    })
  }
}
