import { inject, injectable } from 'tsyringe'
import { ProductsRepository } from '../infra/orm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError'
import { IFindProduct } from '../domain/models/IFindProduct'

@injectable()
export class RemoveProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async executeRemoveProduct({ id }: IFindProduct): Promise<void> {
    const productExists = await this.productsRepository.findById({ id })

    if (!productExists) {
      throw new AppError('Product not found')
    }
    const product = await this.productsRepository.remove(id)
    return product
  }
}
