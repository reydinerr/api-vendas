import { validate } from 'class-validator'
import { Request, Response } from 'express'
import { ProductsRepository } from '../infra/orm/repositories/ProductsRepository'
import { container, inject, injectable } from 'tsyringe'
import { ShowProductService } from '../services/ShowProductService'

@injectable()
export class ProductsController {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: ProductsRepository,
  ) {}

  public async list(request: Request, response: Response): Promise<Response> {
    const skip = Number(request?.query?.skip) || 0
    const take = Number(request?.query?.take) || 10
    const products = await this.productsRepository.getAll({ skip, take })
    return response.json(products)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const showProduct = await container.resolve(ShowProductService)
    const product = await showProduct.executeShowProduct({ id })
    return res.json(product)
  }
}
