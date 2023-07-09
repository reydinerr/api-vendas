import {
  IUserTokenId,
  IUserToken,
} from '@modules/user/domain/models/IUserToken'
import { IUserTokensRepository } from '@modules/user/domain/repositories/IUsersTokenRepository'
import { PrismaClient, UserToken } from '@prisma/client'

export class UsersTokenRepository implements IUserTokensRepository {
  private prisma = new PrismaClient()

  public async findByToken({ id }: IUserTokenId): Promise<UserToken | null> {
    const token = await this.prisma.userToken.findUnique({
      where: {
        id,
      },
    })

    return token
  }

  public async generate({ user_id }: IUserToken): Promise<IUserToken> {
    const user = await this.prisma.userToken.create({
      data: {
        user_id,
      },
    })

    return user
  }
}
