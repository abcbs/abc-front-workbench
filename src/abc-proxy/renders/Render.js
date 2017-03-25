import path from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
//客户端请求封装
import ApiClient from '../../abc-framework/utils/ApiClient';
import configureStore from '../../abc-framework/store/configureStore'
//create an express middleware to render your pages on the server
//html page markup
import PrettyError from 'pretty-error';

//路由的状态管理
import { syncHistoryWithStore } from 'react-router-redux';
import {match, RouterContext ,browserHistory} from 'react-router';
//异步装载
// import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
//路由历史在内存中的存储，主要用于服务端
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';

//第一件要做的事情就是对每个请求创建一个新的Redux store实例。这个store惟一作用是提供应用初始的state。
//渲染时，使用<Provider>来包住根组件<App />，以此来让组件树中所有组件都能访问到store.
//服务端渲染最关键的一步是在发送响应前渲染初始的HTML。这就要使用React.renderToString().
//然后使用store.getState()从store得到初始state。renderFullPage函数会介绍接下来如何传递。
import { renderToString } from 'react-dom/server'
import { IntlProvider }                from 'react-intl'
import routes from '../../abc-framework/routeres/Routes'
import Html from './Html'

const pretty = new PrettyError();
// 每当收到请求时都会触发
module.exports  =function(req, res) {
    if (__DEVELOPMENT__) {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
    }
    //得到初始 state
    var data={present:[{text:"testest"+(new Date),completed:false},
        {text:"testest",completed:false}]};
    var intinal={
        visibilityFilter: "SHOW_ALL",
        todos:data
    };
    //请求解析
    const client = new ApiClient(req);
    //请求历史存储
    const memoryHistory = createHistory(req.originalUrl);

    //初始化Redux
    const store = configureStore(memoryHistory, client,intinal);
    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(memoryHistory, store);
    // for react-router example of determining current page by URL take a look at this:
    // https://github.com/halt-hammerzeit/webapp/blob/master/code/server/webpage%20rendering.js
    function hydrateOnClient() {
        res.send('<!doctype html>\n' +
            ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()}
                                          store={store}/>));
    }

    if (__DISABLE_SSR__) {
        hydrateOnClient();
        return;
    }
    match({history,routes, store,location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            console.error('ROUTER ERROR:', pretty.render(err));
            // res.status(500);
            hydrateOnClient();
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const  ClientWrapper =require('../../abc-framework/endpoint/ClientWrapper')
            const component=<Provider store={store}>
                <IntlProvider locale="zh">
                    <RouterContext {...renderProps}/>
                </IntlProvider>
            </Provider>
            const html = renderToString(
                component
            );
            res.send('<!doctype html>\n' +
                ReactDOM.renderToString(
                    <Html assets={webpackIsomorphicTools.assets()}
                          component={component} store={store}/>));
            //res.end(renderFullPage(html, store.getState()));
            // Promise.all([
            //     store.dispatch(fetchList()),
            //     store.dispatch(fetchItem(renderProps.params.id))
            // ])
            //     .then(() => {
            //         const html = renderToString(
            //             <Provider store={store}>
            //                 <RoutingContext {...renderProps} />
            //             </Provider>
            //         );
            //         res.end(renderFullPage(html, store.getState()));
            //     });
        } else {
            res.status(404).end('Not found');
        }
    });
}



