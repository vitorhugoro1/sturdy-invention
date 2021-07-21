import Client from 'App/Models/Client'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Product from 'App/Models/Product'

export const ClientFactory = Factory.define(Client, ({ faker }) => {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toLowerCase(),
  }
}).build()

export const ProductFactory = Factory.define(Product, ({ faker }) => {
  return {
    title: faker.commerce.productName(),
    brand: faker.company.companyName(),
    image: faker.image.imageUrl(),
    price: parseFloat(faker.commerce.price()),
  }
}).build()
