import { api } from '../../abc-framework/server/webservice'
api
(
	'Product-Manager service',
	configuration.product_service.http,
	[
		require('./api/product').default
	]
)