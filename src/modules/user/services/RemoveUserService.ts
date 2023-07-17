import { inject, injectable } from 'tsyringe'
import { NotFoundError } from '@shared/errors/AppError'
import { UsersRepository } from '../infra/repositories/UsersRepository'
import { IFindUserId } from '../domain/models/IFindUser'

@injectable()
export class RemoveUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async executeRemoveUser({ id }: IFindUserId): Promise<void> {
    const userExists = await this.usersRepository.findById({ id })

    if (!userExists) {
      throw new NotFoundError('User not found')
    }
    const user = await this.usersRepository.remove(id)
    return user
  }
}
