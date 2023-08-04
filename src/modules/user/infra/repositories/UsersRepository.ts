import { ICreateUser } from '@modules/user/domain/models/ICreateUser'
import { IFindUser, IFindUserId } from '@modules/user/domain/models/IFindUser'
import { IListUser } from '@modules/user/domain/models/IListUser'
import { IUpdateUserProfile } from '@modules/user/domain/models/IUpdateUserProfile'
import { IUser, IUserReturn } from '@modules/user/domain/models/IUser'
import {
  IUsersRepository,
  SearchParams,
} from '@modules/user/domain/repositories/IUsersRepository'
import { PrismaClient } from '@prisma/client'

export class UsersRepository implements IUsersRepository {
  private prisma = new PrismaClient()

  public async create({ data }: ICreateUser): Promise<IUserReturn> {
    const user = await this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        age: true,
        password: false,
        avatar: true,
        created_at: true,
        updated_at: true,
      },
    })

    return user
  }

  public async findById({ id }: IFindUserId): Promise<IUserReturn | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        age: true,
        password: false,
        avatar: true,
        created_at: true,
        updated_at: true,
      },
    })

    return user
  }

  public async findByCpf(cpf: string): Promise<IUserReturn | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        age: true,
        password: false,
        avatar: true,
        created_at: true,
        updated_at: true,
      },
    })

    return user
  }

  public async findByEmail(email: string): Promise<IUserReturn | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        age: true,
        password: false,
        avatar: true,
        created_at: true,
        updated_at: true,
      },
    })

    return user
  }
  public async findUser({ id, email, cpf }: IFindUser): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        email,
        cpf,
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
          avatar: true,
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
    avatar,
  }: IUpdateUserProfile): Promise<IUserReturn> {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        password,
        avatar,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        age: true,
        password: false,
        avatar: true,
        created_at: true,
        updated_at: true,
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
