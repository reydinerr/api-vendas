import { inject, injectable } from 'tsyringe'
import { ProductsRepository } from '../infra/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError'
import { IFindProductId } from '../domain/models/IFindProduct'

@injectable()
export class RemoveProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async executeRemoveProduct({ id }: IFindProductId): Promise<void> {
    const productExists = await this.productsRepository.findById({ id })

    if (!productExists) {
      throw new AppError('Product not found')
    }
    const product = await this.productsRepository.remove(id)
    return product
  }
}
