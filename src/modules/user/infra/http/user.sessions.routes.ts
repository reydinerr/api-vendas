import { Segments, Joi, celebrate } from 'celebrate'
import { Router } from 'express'
import UserSessionsController from '../controller/UserSessionsController'

const sessionsRouter = Router()
const sessionsController = new UserSessionsController()

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
)

export default sessionsRouter
