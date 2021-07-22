import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.resource('clients', 'ClientsController').apiOnly()
    Route.resource('clients.wishlists', 'WishlistsController').only(['index'])

    Route.post('/clients/:client_id/wishlists/products', 'StoreWishlistProductsController.store')

    Route.resource('products', 'ProductsController').only(['index', 'show'])

    Route.post('/logout', 'AuthController.logout')

    Route.group(() => {
      Route.get('/', 'MeController.me')
      Route.get('wishlist', 'MeController.wishlist')
      Route.post('wishlist/products', 'MeController.addProductOnWishlist')
    }).prefix('me')
  }).middleware(['auth'])

  Route.post('login', 'AuthController.login')
  Route.post('signin', 'AuthController.signIn')
}).prefix('/api')
