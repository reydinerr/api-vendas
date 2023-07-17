import { injectable, inject } from 'tsyringe'
import { IProduct } from '../domain/models/IProduct'
import { NotFoundError } from '@shared/errors/AppError'
import { ProductsRepository } from '../infra/repositories/ProductsRepository'
import { ICreateProduct } from '../domain/models/ICreateProduct'

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
      throw new NotFoundError('Product with name already exists')
    }
    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    })
    return product
  }
}
