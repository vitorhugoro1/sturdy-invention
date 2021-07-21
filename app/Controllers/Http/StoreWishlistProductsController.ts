import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'
import StoreWishlistProductValidator from 'App/Validators/StoreWishlistProductValidator'

export default class StoreWishlistProductsController {
  public async store({ request, response }: HttpContextContract) {
    const storeWishlistProduct = await request.validate(StoreWishlistProductValidator)
    const client = await Client.query()
      .preload('wishlist', (wishlistQuery) => {
        wishlistQuery.preload('products')
      })
      .where('id', request.param('client_id'))
      .firstOrFail()

    await validator.validate({
      schema: schema.create({
        product_id: schema.string({}, [
          rules.unique({
            table: 'product_wisheds',
            column: 'product_id',
            where: {
              wishlist_id: client.wishlist.id,
            },
          }),
        ]),
      }),
      data: storeWishlistProduct,
      messages: { 'product_id.unique': 'Product already exists on Wishlist' },
    })

    await Database.transaction(async (trx) => {
      client.useTransaction(trx)

      await client.wishlist.related('products').attach([storeWishlistProduct.product_id])
    })

    await client.wishlist.load('products')

    return response.json(
      client.wishlist.serialize({
        fields: {
          pick: ['id', 'products'],
        },
      })
    )
  }
}
