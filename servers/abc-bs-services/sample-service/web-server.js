import { api } from '../../abc-framework/server/webservice'
// import sample from './api/sample'
api
(
	'Sample service',
	configuration.sample_service.http,
	[
		//sample
		require('./api/sample').default
	]
)