import { ICreateCustomer } from '@modules/customer/domain/models/ICreateCustomer'
import {
  IFindCustomer,
  IFindCustomerId,
} from '@modules/customer/domain/models/IFindCustomer'
import { IListCustomer } from '@modules/customer/domain/models/IListCustomer'
import { IUpdateCustomerProfile } from '@modules/customer/domain/models/IUpdateCustomerProfile'
import {
  ICustomer,
  ICustomerReturn,
} from '@modules/customer/domain/models/ICustomer'
import {
  ICustomersRepository,
  SearchParams,
} from '@modules/customer/domain/repositories/ICustomersRepository'
import { PrismaClient } from '@prisma/client'

export class CustomersRepository implements ICustomersRepository {
  private prisma = new PrismaClient()

  public async create({ data }: ICreateCustomer): Promise<ICustomerReturn> {
    const customer = await this.prisma.customer.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        cnpj: true,
        password: false,
        created_at: true,
        updated_at: true,
      },
    })
    return customer
  }

  public async findById({
    id,
  }: IFindCustomerId): Promise<ICustomerReturn | null> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        cnpj: true,
        password: false,
        created_at: true,
        updated_at: true,
      },
    })
    return customer
  }

  public async findByCnpj(cnpj: string): Promise<ICustomerReturn | null> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        cnpj,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        cnpj: true,
        password: false,
        created_at: true,
        updated_at: true,
      },
    })
    return customer
  }

  public async findByEmail(email: string): Promise<ICustomerReturn | null> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        cnpj: true,
        password: false,
        created_at: true,
        updated_at: true,
      },
    })
    return customer
  }

  public async findCustomer({
    id,
    email,
    cnpj,
  }: IFindCustomer): Promise<ICustomer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
        email,
        cnpj,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        cnpj: true,
        password: false,
        created_at: true,
        updated_at: true,
      },
    })
    return customer
  }

  public async getAll({ skip, take }: SearchParams): Promise<IListCustomer> {
    const [customer, total] = await this.prisma.$transaction([
      this.prisma.customer.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
          cnpj: true,
          password: false,
          created_at: true,
          updated_at: true,
        },
        skip,
        take,
      }),
      this.prisma.user.count(),
    ])

    const totalPage = Math.ceil(total / take)
    const result = { totalPage, total, customer }

    return result
  }

  public async update({
    id,
    email,
    password,
    avatar,
    name,
  }: IUpdateCustomerProfile): Promise<ICustomerReturn> {
    const customer = await this.prisma.customer.update({
      where: {
        id,
      },
      data: {
        id,
        email,
        password,
        avatar,
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
        cnpj: true,
        age: true,
        password: false,
        avatar: true,
        created_at: true,
        updated_at: true,
      },
    })
    return customer
  }

  public async remove(id: string): Promise<void> {
    await this.prisma.customer.delete({
      where: {
        id,
      },
    })
  }
}
