import { injectable, inject } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { UsersRepository } from '../infra/repositories/UsersRepository'
import { ICreateUser } from '../domain/models/ICreateUser'
import { IUser, IUserReturn } from '../domain/models/IUser'
import BcryptHashProvider from '../provider/HashProvider/implementations/BcryptHashProvider'

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('HashProvider')
    private hashProvider: BcryptHashProvider,
  ) {}
  public async executeCreateUser({ data }: ICreateUser): Promise<IUserReturn> {
    const userExists = await this.usersRepository.findByEmail(data.email)

    if (userExists) {
      throw new AppError('This email is already in used')
    }

    const userCpfExists = await this.usersRepository.findByCpf(data.cpf)

    if (userCpfExists) {
      throw new AppError('This cpf  already exists')
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password)

    data.password = hashedPassword

    const user = await this.usersRepository.create({
      data,
    })
    return user
  }
}
