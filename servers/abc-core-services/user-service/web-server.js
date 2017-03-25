import { api } from '../../abc-framework/server/webservice'

api
(
	'User service',
	configuration.user_service.http,
	[
		require('./api/user').default,
	],{
		https:false
	}
)