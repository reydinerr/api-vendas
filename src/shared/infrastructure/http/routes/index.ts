import { Router } from 'express'
import productsRouter from '@modules/products/infra/http/products.routes'
import sessionsRouter from '@modules/user/infra/http/user.sessions.routes'
import usersRouter from '@modules/user/infra/http/user.routes'

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/session', sessionsRouter)
routes.use('/user', usersRouter)

export default routes
