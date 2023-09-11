import { ICostumerToken, ICostumerTokenId } from '../models/ICostumerToken'

export interface ICostumerTokensRepository {
  findByToken({ id }: ICostumerTokenId): Promise<ICostumerToken | null>
  generate({ costumer_id }: ICostumerToken): Promise<ICostumerToken>
}
