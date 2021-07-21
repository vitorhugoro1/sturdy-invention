import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'
import CreateClientAccountValidator from 'App/Validators/CreateClientAccountValidator'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return response.json(token)
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()

    return response.json({
      revoked: true,
    })
  }

  public async signIn({ request, response }: HttpContextContract) {
    const createClientAccount = await request.validate(CreateClientAccountValidator)

    const client = await Database.transaction(async (trx) => {
      const client = new Client()

      client.merge(createClientAccount)

      client.useTransaction(trx)

      await client.related('wishlist').create({})

      await client.save()

      return client
    })

    return response.json({
      message: `Created client ${client.name} with e-mail ${client.email}`,
    })
  }
}
