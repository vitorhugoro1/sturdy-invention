import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeCreate, beforeSave, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import { v4 } from 'uuid'
import Wishlist from './Wishlist'

export default class Client extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Wishlist, { foreignKey: 'client_id' })
  public wishlist: HasOne<typeof Wishlist>

  @beforeCreate()
  public static assignUuid(client: Client) {
    client.id = v4()
  }

  @beforeSave()
  public static async hashPassword(client: Client) {
    if (client.$dirty.password) {
      client.password = await Hash.make(client.password)
    }
  }
}
