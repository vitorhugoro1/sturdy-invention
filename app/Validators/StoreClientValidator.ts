import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreClientValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [rules.required()]),
    email: schema.string({}, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'clients', column: 'email' }),
    ]),
  })

  public messages = {
    '*': (field: string, rule: string) => {
      return `${rule} validation error on ${field}`
    },
  }
}
