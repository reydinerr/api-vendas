import { Segments, Joi, celebrate } from 'celebrate'
import { Router } from 'express'
import isAuthenticated from '@shared/infrastructure/http/middlewares/isAuthenticated'
import UsersProfileController from '../controller/UserProfileController'
import multer from 'multer'
import uploadConfig from '@config/mail/uploadConfig'

const profileRouter = Router()
const usersProfileController = new UsersProfileController()

const upload = multer(uploadConfig.multer)

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

profileRouter.patch(
  '/update/',
  upload.single('avatar'),
  usersProfileController.updateAvatar,
)

profileRouter.delete('/', usersProfileController.remove)

export default profileRouter
