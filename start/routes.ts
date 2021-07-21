import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('clients', 'ClientsController').apiOnly()
  Route.resource('clients.wishlists', 'WishlistsController').only(['index'])

  Route.post('/clients/:client_id/wishlists/products', 'StoreWishlistProductsController.store')

  Route.resource('products', 'ProductsController').only(['index', 'show'])

  Route.post('/logout', 'AuthController.logout')
})
  .prefix('/api')
  .middleware(['auth'])

Route.post('api/login', 'AuthController.login')
