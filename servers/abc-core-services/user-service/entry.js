require('../../abc-framework/server/back-server-entry')

global.log = require('./log').default;

wait_for_stores([require('./store/store')],
    () => {
        const webserver=require('./web-server');
        return webserver;
    })