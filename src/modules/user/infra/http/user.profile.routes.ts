import { Segments, Joi, celebrate } from 'celebrate'
import { Router } from 'express'
import isAuthenticated from '@shared/infrastructure/http/middlewares/isAuthenticated'
import UsersProfileController from '../controller/UserProfileController'

const profileRouter = Router()
const usersProfileController = new UsersProfileController()

profileRouter.use(isAuthenticated)

profileRouter.get('/', usersProfileController.show)

profileRouter.put(
  '/update/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  usersProfileController.update,
)

profileRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersProfileController.remove,
)

export default profileRouter
