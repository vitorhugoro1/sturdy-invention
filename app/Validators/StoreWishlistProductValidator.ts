import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreWishlistProductValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    product_id: schema.string({ trim: true }, [
      rules.uuid(),
      rules.exists({ table: 'products', column: 'id' }),
    ]),
  })

  public messages = {
    'product_id.exists': 'Product not exists',
  }
}
