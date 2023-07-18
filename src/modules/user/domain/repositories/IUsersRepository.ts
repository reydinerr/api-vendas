import { IUser, IUserReturn } from '../models/IUser'
import { IUpdateUserProfile } from '../models/IUpdateUserProfile'
import { IFindUserId } from '../models/IFindUser'
import { ICreateUser } from '../models/ICreateUser'
import { IListUser } from '../models/IListUser'

export interface SearchParams {
  skip: number
  take: number
}

export interface IUsersRepository {
  create({ data }: ICreateUser): Promise<IUser>
  findById({ id }: IFindUserId): Promise<IUser | null>
  findByCpf(cpf: string): Promise<IUser | null>
  findByEmail(email: string): Promise<IUserReturn | null>
  remove(id: string): Promise<void>
  update({ id, email, password }: IUpdateUserProfile): Promise<IUser>
  getAll({ skip, take }: SearchParams): Promise<IListUser>
}
