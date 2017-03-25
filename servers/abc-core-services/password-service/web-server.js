import { api } from '../../abc-framework/server/webservice'

api
(
	'Password service',
	configuration.password_service.http,
	[
		require('./api/password')
	]
)