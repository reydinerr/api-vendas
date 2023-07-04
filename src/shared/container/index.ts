import { ProductsRepository } from '@modules/products/infra/orm/repositories/ProductsRepository'
import { CreateProductService } from '@modules/products/services/CreateProductService'
import { RemoveProductService } from '@modules/products/services/RemoveProductService'
import { ShowProductService } from '@modules/products/services/ShowProductService'
import { UpdateProductService } from '@modules/products/services/UpdateProductService'
import { PrismaClient } from '@prisma/client'
import { container } from 'tsyringe'
//import '@modules/products/providers'

container.registerSingleton('ProductsRepository', ProductsRepository)
container.registerSingleton('PrismaRepository', PrismaClient)
container.registerSingleton('CreateProductService', CreateProductService)
container.registerSingleton('UpdateProductService', UpdateProductService)
container.registerSingleton('ShowProductService', ShowProductService)
container.registerSingleton('ShowProductService', RemoveProductService)
