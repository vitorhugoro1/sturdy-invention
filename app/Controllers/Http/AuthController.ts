import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'

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
    const client = await Database.transaction(async (trx) => {
      const client = new Client()

      client.merge(request.body())

      client.useTransaction(trx)

      await client.related('wishlist').create({})

      await client.save()
    })

    return response.json(client)
  }
}
