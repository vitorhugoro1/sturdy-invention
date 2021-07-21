import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { uuid } from 'uuidv4'

export default class Product extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public brand: string

  @column()
  public image: string

  @column()
  public price: number

  @column()
  public reviewScore: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = uuid()
  }
}
