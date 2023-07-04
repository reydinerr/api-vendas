import { Router } from 'express'
import productsRouter from '@modules/products/infra/http/products.routes'

const routes = Router()

routes.use('/products', productsRouter)

export default routes
