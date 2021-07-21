import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Wishlists extends BaseSchema {
  protected tableName = 'wishlists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('client_id').references('clients.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
