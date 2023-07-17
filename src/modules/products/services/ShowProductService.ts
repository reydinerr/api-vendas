import { inject, injectable } from 'tsyringe'
import { ProductsRepository } from '../infra/repositories/ProductsRepository'
import { IProduct } from '../domain/models/IProduct'
import { NotFoundError } from '@shared/errors/AppError'
import { IFindProductId } from '../domain/models/IFindProduct'

@injectable()
export class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async executeShowProduct({ id }: IFindProductId): Promise<IProduct> {
    const product = await this.productsRepository.findById({ id })

    if (!product) {
      throw new NotFoundError('Product not found')
    }
    return product
  }
}
