import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'

export default class WishlistsController {
  public async index({ request, response }: HttpContextContract) {
    const client = await Client.query()
      .preload('wishlist', (wishlistQuery) => {
        wishlistQuery.preload('products')
      })
      .where('id', request.param('client_id'))
      .firstOrFail()

    return response.json(
      client.wishlist.serialize({
        fields: {
          pick: ['id', 'products'],
        },
      })
    )
  }
}
