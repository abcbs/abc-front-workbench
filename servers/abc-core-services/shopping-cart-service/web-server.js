import { api } from '../../abc-framework/server/webservice'
api
(
	'Shopping-Cart-Manager service',
	configuration.shopping_cart_service.http,
	[
		//sample
		require('./api/shopping-cart').default
	]
)