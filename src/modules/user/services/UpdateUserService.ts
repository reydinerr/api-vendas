import { inject, injectable } from 'tsyringe'
import {
  AppError,
  NotFoundError,
  UnauthorizedError,
} from '@shared/errors/AppError'
import { IUpdateUserProfile } from '../domain/models/IUpdateUserProfile'
import { UsersRepository } from '../infra/repositories/UsersRepository'
import { IUserReturn } from '../domain/models/IUser'
import BcryptHashProvider from '../provider/HashProvider/implementations/BcryptHashProvider'

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('HashProvider')
    private hashProvider: BcryptHashProvider,
  ) {}

  public async executeUpdateUser({
    id,
    email,
    password,
    old_password,
  }: IUpdateUserProfile): Promise<IUserReturn> {
    const user = await this.usersRepository.findUser({ id })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const userEmailExists = await this.usersRepository.findByEmail(email)

    if (userEmailExists && userEmailExists.id !== id) {
      throw new AppError('There is already one user with this email.')
    }

    if (password && !old_password) {
      throw new AppError('Old password is required!')
    }

    if (password === old_password) {
      throw new AppError('New password cannot be the same as the old one')
    }

    if (password && old_password) {
      const checkCurrentPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      )

      if (!checkCurrentPassword) {
        throw new UnauthorizedError('Old password is not match!')
      }

      const hashedPassword = await this.hashProvider.generateHash(password)

      password = hashedPassword
    }

    user.email = email

    const userUpdated = await this.usersRepository.update({
      id,
      email,
      password,
    })

    return userUpdated
  }
}
