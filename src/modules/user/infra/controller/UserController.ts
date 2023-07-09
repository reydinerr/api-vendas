import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UsersRepository } from '../repositories/UsersRepository'
import { CreateUserService } from '@modules/user/services/CreateUserService'

export default class UsersController {
  public async list(req: Request, res: Response): Promise<Response> {
    const skip = Number(req?.query?.skip) || 0
    const take = Number(req?.query?.take) || 10
    const usersRepository = container.resolve(UsersRepository)
    const users = await usersRepository.getAll({ skip, take })
    return res.json(users)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body
    const createUser = await container.resolve(CreateUserService)
    const user = await createUser.executeCreateUser({
      data,
    })
    return res.json(user)
  }

  // public async remove(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params
  //   const removeUser = await container.resolve(RemoveUserservice)
  //   await removeUser.executeRemoveUser({ id })
  //   return res.json([])
  // }
}
