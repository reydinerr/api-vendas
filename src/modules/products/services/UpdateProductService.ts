import { inject, injectable } from 'tsyringe'
import { ProductsRepository } from '../infra/orm/repositories/ProductsRepository'
import { IProduct } from '../domain/models/IProduct'
import AppError from '@shared/errors/AppError'
import { IUpdateProduct } from '../domain/models/IUpdateProduct'

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async executeUpdateProduct({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const productIdExists = await this.productsRepository.findById(id)

    if (!productIdExists) {
      throw new AppError('Product not found')
    }

    const productNameExists = await this.productsRepository.findByName(name)

    if (productNameExists) {
      throw new AppError('Product with name already exists')
    }

    const product = await this.productsRepository.update({
      id,
      name,
      price,
      quantity,
    })
    return product
  }
}
