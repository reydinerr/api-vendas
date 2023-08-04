import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserService } from '@modules/user/services/UpdateUserService'
import { RemoveUserService } from '@modules/user/services/RemoveUserService'
import { ShowUserProfileService } from '@modules/user/services/ShowUserProfileService'
import { UpdateUserAvatarService } from '@modules/user/services/UpdateUserAvatarService'

export default class UsersProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showUser = await container.resolve(ShowUserProfileService)
    const id = req.user.id

    const user = await showUser.executeShowUser({ id })
    return res.json(user)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = req.user.id
    const { email, old_password, password } = req.body
    const updateUser = await container.resolve(UpdateUserService)
    const user = await updateUser.executeUpdateUser({
      id,
      email,
      old_password,
      password,
    })
    return res.json(user)
  }

  public async updateAvatar(req: Request, res: Response): Promise<Response> {
    const id = req.user.id
    const avatarFile = req.file.filename
    const updateUserAvatar = await container.resolve(UpdateUserAvatarService)
    await updateUserAvatar.executeUpdateAvatar({
      id,
      avatarFile,
    })
    return res.json({ message: 'Avatar atualizado com sucesso' })
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const id = req.user.id
    const removeUser = await container.resolve(RemoveUserService)
    await removeUser.executeRemoveUser({ id })
    return res.json([])
  }
}
