import { injectable, inject } from 'tsyringe'
import { UnauthorizedError } from '@shared/errors/AppError'
import { UsersRepository } from '../infra/repositories/UsersRepository'
import BcryptHashProvider from '../provider/HashProvider/implementations/BcryptHashProvider'
import { ICreateSession } from '../domain/models/ICreateSession'
import authConfig from '@config/auth'
import { Secret, sign } from 'jsonwebtoken'
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated'

@injectable()
export class CreateLoginService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('HashProvider')
    private hashProvider: BcryptHashProvider,
  ) {}
  public async executeCreateSession({
    email,
    password,
  }: ICreateSession): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedError('Incorrect email/password combination')
    }

    const confirmedPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    )

    if (!confirmedPassword) {
      throw new UnauthorizedError('Incorrect email/password combination')
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    })

    return { user, token }
  }
}
