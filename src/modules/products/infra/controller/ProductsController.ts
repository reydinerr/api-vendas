import { Request, Response } from 'express'
import { ProductsRepository } from '../../infra/repositories/ProductsRepository'
import { container } from 'tsyringe'
import { ShowProductService } from '../../services/ShowProductService'
import { CreateProductService } from '../../services/CreateProductService'
import { UpdateProductService } from '../../services/UpdateProductService'
import { RemoveProductService } from '../../services/RemoveProductService'

export default class ProductsController {
  public async list(req: Request, res: Response): Promise<Response> {
    const skip = Number(req?.query?.skip) || 0
    const take = Number(req?.query?.take) || 10
    const productsRepository = container.resolve(ProductsRepository)
    const products = await productsRepository.getAll({ skip, take })
    return res.json(products)
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const showProduct = await container.resolve(ShowProductService)
    const product = await showProduct.executeShowProduct({ id })
    return res.json(product)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body
    const createProduct = await container.resolve(CreateProductService)
    const product = await createProduct.executeCreateProduct({
      name,
      price,
      quantity,
    })
    return res.json(product)
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, price, quantity } = req.body
    const updateProduct = await container.resolve(UpdateProductService)
    const product = await updateProduct.executeUpdateProduct({
      id,
      name,
      price,
      quantity,
    })
    return res.json(product)
  }

  public async remove(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const removeProduct = await container.resolve(RemoveProductService)
    await removeProduct.executeRemoveProduct({ id })
    return res.json([])
  }
}
