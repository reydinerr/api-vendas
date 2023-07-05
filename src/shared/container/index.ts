import { ProductsRepository } from '@modules/products/infra/repositories/ProductsRepository'
import { container } from 'tsyringe'
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository'
//import '@modules/products/providers'

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
)
