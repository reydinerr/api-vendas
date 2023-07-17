import { injectable, inject } from 'tsyringe'
import { NotFoundError } from '@shared/errors/AppError'
import { UsersRepository } from '../infra/repositories/UsersRepository'
import { IUser } from '../domain/models/IUser'
import { IFindUserId } from '../domain/models/IFindUser'

@injectable()
export class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async executeShowUser({ id }: IFindUserId): Promise<IUser> {
    const user = await this.usersRepository.findById({ id })

    if (!user) {
      throw new NotFoundError('User not found!')
    }

    return user
  }
}
