/**
 * 由react-iosmorphic-render实现
 * @deprecated
 */
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import { Router, browserHistory ,applyRouterMiddleware} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// import { useScroll } from 'react-router-scroll';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import ApiClient from '../react-isomorphic-render/http-client-main'
import configureStore from '../store/configureStore'
import routes from '../routeres/Routes'
import  ClientWrapper from './ClientWrapper'
const Client = (props) =>
{
    const { data, messages } = props;
    const client = new ApiClient();
    const _browserHistory = useScroll(() => browserHistory)();
    const store = configureStore(browserHistory, client, data);
    const history = syncHistoryWithStore(browserHistory, store);

    const component = (
        <Router  render={applyRouterMiddleware(useScroll())}
                 history={history}>
            {routes}
        </Router>
    );
    if (process.env.NODE_ENV !== 'production') {
        window.React = React; // enable debugger
    }

    if (__DEVTOOLS__ && !window.devToolsExtension) {
        const DevTools = require('../devtools/DevTools').default;
        return (
            <Provider store={store} key="provider">
                 <ClientWrapper store={store} locale="zh" messages={messages}>
                     <div>
                            {component}
                            <DevTools />
                      </div>
                 </ClientWrapper>

            </Provider>);

    }else{
        return (<Provider store={store} key="provider">
            <ClientWrapper store={store} locale="zh" messages={messages}>
                 {component}
            </ClientWrapper>
        </Provider>);
    }

}


export default Client;
