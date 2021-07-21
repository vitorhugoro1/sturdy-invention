import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClientAccountValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    email: schema.string({}, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'clients', column: 'email' }),
    ]),
    password: schema.string({}, [rules.confirmed()]),
  })

  public messages = {}
}
