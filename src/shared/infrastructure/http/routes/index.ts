import { Router } from 'express'
import productsRouter from '@modules/products/infra/http/products.routes'
import sessionsRouter from '@modules/user/infra/http/user.sessions.routes'
import usersRouter from '@modules/user/infra/http/user.routes'
import profileRouter from '@modules/user/infra/http/user.profile.routes'

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/session', sessionsRouter)
routes.use('/user', usersRouter)
routes.use('/profile', profileRouter)

export default routes
