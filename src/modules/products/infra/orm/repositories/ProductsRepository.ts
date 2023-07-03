import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct'
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate'
import { ISearchParam } from '@modules/products/domain/models/ISearchParam'
import { IUpdateProduct } from '@modules/products/domain/models/IUpdateProduct'
import {
  IProductsRepository,
  SearchParams,
} from '@modules/products/domain/repositories/IProductsRepository'
import { PrismaClient, Product } from '@prisma/client'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ProductsRepository implements IProductsRepository {
  constructor(
    @inject('PrismaRepository')
    private prisma: PrismaClient,
  ) {}

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

  public async findById(id: string): Promise<Product | null> {
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

  public async findAll({
    skip,
    take,
  }: SearchParams): Promise<IProductPaginate> {
    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        select: {},
      }),
    ])
    return product
  }

  public async update({ id, data }: IUpdateProduct): Promise<Product> {
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data,
    })
    return product
  }

  public async remove({ id }: Product): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id,
      },
    })
  }
}
