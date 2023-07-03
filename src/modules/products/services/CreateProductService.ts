import { inject, injectable } from 'tsyringe'
import { ProductsRepository } from '../infra/orm/repositories/ProductsRepository'
import { ICreateProduct } from '../domain/models/ICreateProduct'
import { IProduct } from '../domain/models/IProduct'
import AppError from '@shared/errors/AppError'

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async executeCreateProduct({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productsRepository.findByName(name)

    if (productExists) {
      throw new AppError('Product with name already exists')
    }
    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    })
    return product
  }
}
