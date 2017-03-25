import { api } from '../../abc-framework/server/webservice'
api
(
	'Order-Manager service',
	configuration.order_service.http,
	[
		require('./api/order').default
	]
)