import { IUserReturn } from '../models/IUser'
import { IUpdateUserProfile } from '../models/IUpdateUserProfile'
import { IFindUser, IFindUserId } from '../models/IFindUser'
import { ICreateUser } from '../models/ICreateUser'
import { IListUser } from '../models/IListUser'

export interface SearchParams {
  skip: number
  take: number
}

export interface IUsersRepository {
  create({ data }: ICreateUser): Promise<IUserReturn>
  findById({ id }: IFindUserId): Promise<IUserReturn | null>
  findUser({ id, email, cpf }: IFindUser): Promise<IUserReturn | null>
  findByCpf(cpf: string): Promise<IUserReturn | null>
  findByEmail(email: string): Promise<IUserReturn | null>
  remove(id: string): Promise<void>
  update({ id, email, password }: IUpdateUserProfile): Promise<IUserReturn>
  getAll({ skip, take }: SearchParams): Promise<IListUser>
}
