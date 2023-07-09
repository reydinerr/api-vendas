import { ProductsRepository } from '@modules/products/infra/repositories/ProductsRepository'
import { container } from 'tsyringe'
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository'
import { UsersRepository } from '@modules/user/infra/repositories/UsersRepository'
import { IUsersRepository } from '@modules/user/domain/repositories/IUsersRepository'
import '@modules/user/provider'

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
)
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)
