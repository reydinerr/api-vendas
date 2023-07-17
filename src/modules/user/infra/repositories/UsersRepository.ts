import { ICreateUser } from '@modules/user/domain/models/ICreateUser'
import { IFindUserId } from '@modules/user/domain/models/IFindUser'
import { IListUser } from '@modules/user/domain/models/IListUser'
import { IUpdateUserProfile } from '@modules/user/domain/models/IUpdateUserProfile'
import { IUser } from '@modules/user/domain/models/IUser'
import {
  IUsersRepository,
  SearchParams,
} from '@modules/user/domain/repositories/IUsersRepository'
import { PrismaClient } from '@prisma/client'

export class UsersRepository implements IUsersRepository {
  private prisma = new PrismaClient()

  public async create({ data }: ICreateUser): Promise<IUser> {
    const user = await this.prisma.user.create({
      data,
    })

    return user
  }

  public async findById({ id }: IFindUserId): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  public async findByCpf(cpf: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    })

    return user
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  public async getAll({ skip, take }: SearchParams): Promise<IListUser> {
    const [user, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          cpf: true,
          age: true,
          password: false,
        },
        skip,
        take,
      }),
      this.prisma.user.count(),
    ])

    const totalPage = Math.ceil(total / take)
    const result = { totalPage, total, user }

    return result
  }

  public async update({
    id,
    email,
    password,
  }: IUpdateUserProfile): Promise<IUser> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        password,
      },
    })
    return user
  }

  public async remove(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
