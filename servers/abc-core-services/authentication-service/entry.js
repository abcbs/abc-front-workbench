require('../../abc-framework/server/back-server-entry')

global.log = require('./log').default;

wait_for_stores
([
	require('./store/online/online-store'),
	require('./store/store')
],
() => require('./web-server'))