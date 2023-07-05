import { inject, injectable } from 'tsyringe'
import { ProductsRepository } from '../infra/repositories/ProductsRepository'
import { IProduct } from '../domain/models/IProduct'
import AppError from '@shared/errors/AppError'
import { IFindProduct } from '../domain/models/IFindProduct'

@injectable()
export class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async executeShowProduct({ id }: IFindProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById({ id })

    if (!product) {
      throw new AppError('Product not found')
    }
    return product
  }
}
