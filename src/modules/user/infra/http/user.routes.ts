import { Segments, Joi, celebrate } from 'celebrate'
import { Router } from 'express'
import UsersController from '../controller/UserController'
import isAuthenticated from '@shared/infrastructure/http/middlewares/isAuthenticated'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.get('/', isAuthenticated, usersController.list)

usersRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
)

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

usersRouter.put(
  '/update/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      data: {
        email: Joi.string().required(),
        password: Joi.string().required(),
        old_password: Joi.string().required(),
      },
    },
  }),
  usersController.update,
)

// usersRouter.delete(
//   '/:id',
//   celebrate({
//     [Segments.PARAMS]: {
//       id: Joi.string().uuid().required(),
//     },
//   }),
//   usersController.remove,
// )

export default usersRouter
