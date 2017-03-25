/**
 * Application的入口方法
 */
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client';
// import 'bootstrap/less/theme.less'
// import 'bootstrap/less/bootstrap.less';
import FastClick from './fastclick';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import international from '../international/loader';

// import { render as isomorphicRender}     from 'react-isomorphic-render/redux'

import { render as isomorphicRender}     from '../react-isomorphic-render/redux'
import common         from './react-isomorphic-render'

import assets from './assets'
import {clientWidth,devicePixelRatio }from '../utils/Devices'
// fixedDevice()
for (let asset of Object.keys(assets))
{
    assets[asset]()
}
const dpr=devicePixelRatio();
// injectTapEventPlugin();
// Make taps on links and buttons work fast on mobiles
// FastClick.attach(document.body,{tapDelay:10,tapTimeout:200});

//在服务端渲染中，这是客户端
//store(Redux Store): 应用程序中唯一的Redux store对象
//通过服务端注入的全局变量得到初始state
const initialState = window.__INITIAL_STATE__=window._flux_store_data;
window._authentication_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9." +
    "J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8";

const dest=document.getElementById('root');
//模拟数据
const authentication={authentication:{
    user:{
        id:"001",
        name:"张三",
        role:"administrator"
    }
    }
}

var data= {present:[{text:"client数据"+"DPR:"+dpr.clientWidth+"drp:"+dpr.dpr+"日期："+(new Date),completed:false},
    {text:"客户端测试数据",completed:false}]};

const state =
{
    authentication:authentication,
    visibilityFilter: "SHOW_ALL",
    todos:data
    // default:{
    //
    // visibilityFilter: "SHOW_ALL",
    // todos:data
// },
    // authentication: { user },
    // Is used by "material-ui" for CSS autoprefixing
    // navigator: { userAgent: request.headers['user-agent'] }
}
if(!initialState){
    window._flux_store_data=state;
}
international.load().then(() =>
{
    // function initSocket() {
    //     const socket = io('', {path: '/ws'});
    //     socket.on('news', (data) => {
    //         console.log(data);
    //         socket.emit('my other event', { my: 'data from client' });
    //     });
    //     socket.on('msg', (data) => {
    //         console.log(data);
    //     });
    //
    //     return socket;
    // }
    // global.socket = initSocket();
    // since react-intl assumes Intl is already in the global scope,
    // we can't import the routes (which imports react-intl in some of its components)
    // before polyfilling Intl. That's why you see require("./routes") here,
    // and not as import on the top of the file.
    const create_routes = require('../routeres/Routes')
    //设置本地语言
    global._locale=window._locale=window._locale||'zh';

    // renders the webpage on the client side
    return isomorphicRender
    ({
            // enable/disable development mode (true/false)
            // development: __DEVELOPMENT__,
            development: false,
            // enable/disable Redux dev-tools (true/false)
            devtools: __DEVTOOLS__ && !window.devToolsExtension?  require('./devtools').default: undefined,

            // internationalization
            // (this is here solely for Webpack HMR in dev mode)
            translation: __DEVELOPMENT__ ? international.load_translation : undefined
        },
        // {
        //     reducer: () => require('../reducers'),
        //     routes:create_routes,
        //     wrapper: <Client data={initialState} messages={data}/>,
        // }
        common
        )
        .then(({ component, store, rerender }) =>
        {
            // international.hot_reload(rerender)
            console.log("运行成功")
        }).catch(err=>{
            //目前抛出异常为react重画问题
            console.log(err)
        })
});

//load the Intl polyfill and its locale data before rendering the application
// international.load().then(() =>
// {
//
//     function initSocket() {
//         const socket = io('', {path: '/ws'});
//         socket.on('news', (data) => {
//             console.log(data);
//             socket.emit('my other event', { my: 'data from client' });
//         });
//         socket.on('msg', (data) => {
//             console.log(data);
//         });
//
//         return socket;
//     }
//     // global.socket = initSocket();
//     const Client= require ('./Client').default;
//     international.load_translation('zh').then(data=>{
//         // renders the webpage on the client side
//         render
//         (
//             <Client data={initialState} messages={data}/>,
//             document.getElementById('root')
//
//         )
//     }).then(({ component, store, rerender }) =>
//     {
//         international.hot_reload(rerender)
//     }).catch(err=>{
//         //目前抛出异常为react重画问题
//         console.log(err)
//     })
//
//
// })

// render(
//     <Client data={initialState}/>,
//     document.getElementById('root'));




