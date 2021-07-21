import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Client from 'App/Models/Client'
import StoreClientValidator from 'App/Validators/StoreClientValidator'
import UpdateClientValidator from 'App/Validators/UpdateClientValidator'

export default class ClientsController {
  public async index({ response }: HttpContextContract) {
    const clients = await Client.all()

    return response.json(clients)
  }

  public async store({ response, request }: HttpContextContract) {
    const storeClient = await request.validate(StoreClientValidator)

    const client = await Database.transaction(async (trx) => {
      const client = new Client()

      client.merge(storeClient)

      client.useTransaction(trx)

      await client.save()

      await client.related('wishlist').create({})

      return client
    })

    return response.created(client)
  }

  public async show({ request, response }: HttpContextContract) {
    const client = await Client.findOrFail(request.param('id'))

    return response.json(client)
  }

  public async update({ request, response }: HttpContextContract) {
    const updateClient = await request.validate(UpdateClientValidator)

    const client = await Database.transaction(async (trx) => {
      const client = new Client()

      client.merge(updateClient)

      client.useTransaction(trx)

      await client.save()

      return client
    })

    return response.json(client)
  }

  public async destroy({}: HttpContextContract) {}
}
