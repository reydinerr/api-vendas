import { Router } from 'express'

const routes = Router()

routes.use('/products', ProductsRouter)
