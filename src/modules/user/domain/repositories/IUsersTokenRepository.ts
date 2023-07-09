import { IUserToken, IUserTokenId } from '../models/IUserToken'

export interface IUserTokensRepository {
  findByToken({ id }: IUserTokenId): Promise<IUserToken | null>
  generate({ user_id }: IUserToken): Promise<IUserToken>
}
