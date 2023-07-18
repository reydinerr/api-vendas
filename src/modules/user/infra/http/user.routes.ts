import { Segments, Joi, celebrate } from 'celebrate'
import { Router } from 'express'
import UsersController from '../controller/UserController'
import isAuthenticated from '@shared/infrastructure/http/middlewares/isAuthenticated'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', isAuthenticated, usersController.list)

usersRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
      age: Joi.number().required(),
    },
  }),
  usersController.create,
)

export default usersRouter
