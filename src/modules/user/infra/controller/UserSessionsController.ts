import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateLoginService } from '@modules/user/services/CreateLoginSessionService'
import { instanceToInstance } from 'class-transformer'

export default class UserSessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    const createUser = await container.resolve(CreateLoginService)
    const user = await createUser.executeCreateSession({ email, password })
    return res.json(instanceToInstance(user))
  }
}
