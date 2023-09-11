import { ICustomerReturn } from '../models/ICustomer'
import { IUpdateCustomerProfile } from '../models/IUpdateCustomerProfile'
import { IFindCustomer, IFindCustomerId } from '../models/IFindCustomer'
import { ICreateCustomer } from '../models/ICreateCustomer'
import { IListCustomer } from '../models/IListCustomer'

export interface SearchParams {
  skip: number
  take: number
}

export interface ICustomersRepository {
  create({ data }: ICreateCustomer): Promise<ICustomerReturn>
  findById({ id }: IFindCustomerId): Promise<ICustomerReturn | null>
  findCustomer({
    id,
    email,
    cnpj,
  }: IFindCustomer): Promise<ICustomerReturn | null>
  findByCnpj(cnpj: string): Promise<ICustomerReturn | null>
  findByEmail(email: string): Promise<ICustomerReturn | null>
  remove(id: string): Promise<void>
  update({
    id,
    email,
    password,
  }: IUpdateCustomerProfile): Promise<ICustomerReturn>
  getAll({ skip, take }: SearchParams): Promise<IListCustomer>
}
