import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { validator, schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import StoreWishlistProductValidator from 'App/Validators/StoreWishlistProductValidator'

export default class MeController {
  public async me({ response, auth }: HttpContextContract) {
    return response.json(auth.use('api').user)
  }

  public async wishlist({ response, auth }: HttpContextContract) {
    await auth.use('api').user?.load('wishlist', (wishlistQuery) => {
      wishlistQuery.preload('products')
    })

    return response.json(
      auth.use('api').user?.wishlist.serialize({
        fields: {
          pick: ['id', 'products'],
        },
      })
    )
  }

  public async addProductOnWishlist({ auth, response, request }: HttpContextContract) {
    const storeWishlistProduct = await request.validate(StoreWishlistProductValidator)
    await auth.use('api').user?.load('wishlist', (wishlistQuery) => {
      wishlistQuery.preload('products')
    })

    await validator.validate({
      schema: schema.create({
        product_id: schema.string({}, [
          rules.unique({
            table: 'product_wisheds',
            column: 'product_id',
            where: {
              wishlist_id: auth.use('api').user?.wishlist.id,
            },
          }),
        ]),
      }),
      data: storeWishlistProduct,
      messages: { 'product_id.unique': 'Product already exists on Wishlist' },
    })

    await Database.transaction(async (trx) => {
      auth.use('api').user?.useTransaction(trx)

      await auth
        .use('api')
        .user?.wishlist.related('products')
        .attach([storeWishlistProduct.product_id])
    })

    await auth.use('api').user?.wishlist.load('products')

    return response.json(
      auth.use('api').user?.wishlist.serialize({
        fields: {
          pick: ['id', 'products'],
        },
      })
    )
  }
}
