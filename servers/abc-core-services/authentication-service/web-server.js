import { api } from '../../abc-framework/server/webservice'

api
(
	'Authentication service',
	configuration.authentication_service.http,
	[
		require('./api/authentication').default,
		require('./api/authentication-manager-api').default
	]
)