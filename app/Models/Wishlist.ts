import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  belongsTo,
  BelongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { uuid } from 'uuidv4'
import Client from './Client'
import Product from './Product'

export default class Wishlist extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @belongsTo(() => Client, {
    foreignKey: 'client_id',
  })
  public client: BelongsTo<typeof Client>

  @column()
  public client_id: string

  @manyToMany(() => Product, {
    pivotForeignKey: 'wishlist_id',
    pivotRelatedForeignKey: 'product_id',
    pivotTable: 'product_wisheds',
  })
  public products: ManyToMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(wishlist: Wishlist) {
    wishlist.id = uuid()
  }
}
