import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateUserService } from '@modules/user/services/UpdateUserService'
import { RemoveUserService } from '@modules/user/services/RemoveUserService'
import { ShowUserProfileService } from '@modules/user/services/ShowUserProfileService'

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

  public async remove(req: Request, res: Response): Promise<Response> {
    const id = req.user.id
    const removeUser = await container.resolve(RemoveUserService)
    await removeUser.executeRemoveUser({ id })
    return res.json([])
  }
}
