import { ProductsRepository } from '@modules/products/infra/orm/repositories/ProductsRepository'
import { PrismaClient } from '@prisma/client'
import { container } from 'tsyringe'
//import '@modules/products/providers'

container.registerSingleton('ProductsRepository', ProductsRepository)
container.registerSingleton('PrismaRepository', PrismaClient)
