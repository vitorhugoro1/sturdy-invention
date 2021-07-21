import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('perPage', 10)
    const products = await Product.query().paginate(page, limit)

    return response.json(products)
  }

  public async show({ request, response }: HttpContextContract) {
    const product = await Product.findOrFail(request.param('id'))

    return response.json(product)
  }
}
