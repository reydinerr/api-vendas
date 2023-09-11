import { ProductsRepository } from '@modules/products/infra/repositories/ProductsRepository'
import { container } from 'tsyringe'
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository'
import { UsersRepository } from '@modules/user/infra/repositories/UsersRepository'
import { IUsersRepository } from '@modules/user/domain/repositories/IUsersRepository'
import '@modules/user/provider'
import { ICustomersRepository } from '@modules/customer/domain/repositories/ICustomersRepository'
import { CustomersRepository } from '@modules/customer/infra/repositories/CustomerRepository'

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
)
