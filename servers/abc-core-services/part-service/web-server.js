import { api } from '../../abc-framework/server/webservice'
api
(
	'Part-Manager service',
	configuration.part_service.http,
	[
		require('./api/part').default
	]
)