import Client from 'App/Models/Client'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Product from 'App/Models/Product'
import Hash from '@ioc:Adonis/Core/Hash'

export const ClientFactory = Factory.define(Client, async ({ faker }) => {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toLowerCase(),
    password: await Hash.make('password'),
  }
}).build()

export const ProductFactory = Factory.define(Product, ({ faker }) => {
  return {
    title: faker.commerce.productName(),
    brand: faker.company.companyName(),
    image: faker.image.imageUrl(),
    price: parseFloat(faker.commerce.price()),
    reviewScore: faker.datatype.number(5),
  }
}).build()
