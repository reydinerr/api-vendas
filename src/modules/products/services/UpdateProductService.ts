import { inject, injectable } from 'tsyringe'
import { ProductsRepository } from '../infra/repositories/ProductsRepository'
import { NotFoundError } from '@shared/errors/AppError'
import { IUpdateProduct } from '../domain/models/IUpdateProduct'
import { IProduct } from '../domain/models/IProduct'

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async executeUpdateProduct({
    id,
    name,
  }: IUpdateProduct): Promise<IProduct> {
    const productIdExists = await this.productsRepository.findById({ id })

    if (!productIdExists) {
      throw new NotFoundError('Product not found')
    }

    const productNameExists = await this.productsRepository.findByName(name)

    if (productNameExists) {
      throw new NotFoundError('Product with name already exists')
    }

    const product = await this.productsRepository.update({
      id,
      name,
    })
    return product
  }
}
