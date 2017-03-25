import webpageServer from '../../abc-framework/react-isomorphic-render/server'
import settings from '../../abc-framework/endpoint/react-isomorphic-render'
import React, {Component, PropTypes} from 'react';
//压缩
// import compression from 'compression';
import path from 'path';
import {HeaderInnerHTML,BodyStart,Header} from './Html'
import staticServer from 'koa-static';
import koa  from  'koa';
import compress from 'koa-compress';
// import etag from 'koa-etag';
import proxy from '../../../servers/abc-framework/http/middleware/proxy'
import {options} from './abc-args';
import Spinner from '../../abc-ui/spinner'
const port = process.env.PORT || options.port||3010;
const host = process.env.host || options.host||'localhost';
const apiHost = process.env.apiHost || options.apiHost||'localhost';
const apiPort = process.env.apiPort || options.apiPort||'3030';

const targetUrl = 'http://' +apiHost + ':' + apiPort;

const publicPath=options.publicPath;
const repoRoot = path.resolve(__dirname, publicPath||'../../../');

global.__DEVTOOLS__=process.env.__DEVTOOLS__ || options.__DEVTOOLS__||false;
global.__DEVELOPMENT__=process.env.__DEVELOPMENT__ || options.__DEVELOPMENT__||false;
var dist=path.join(repoRoot, '/dist');
var external=path.join(repoRoot, '/external');

var build=path.join(repoRoot, '/build');

//创建服务端代理
const {middleware} = proxy('/api',targetUrl)
// const {wsMiddleware} = proxy('/ws',targetUrl)

// server.use(middleware);
// Create webpage rendering server
const server = webpageServer
({
        middleware:[
            staticServer(repoRoot),
            middleware
        ],
        application:
        {
            host: apiHost,
            port: apiPort,
            secure: true // for HTTPS
        },
        assets:(url)=>
        {
            // javascript: '/build/app.js',
            // style: '/build/css/app.css',
            // if (__DEVELOPMENT__)
            // {
            //     webpackIsomorphicTools&&webpackIsomorphicTools.refresh()
            // }
            // const assets = webpackIsomorphicTools.assets();
            const result =
            {
                // entry      : '/build/app',
                // javascript : assets.javascript,
                // style      : assets.styles,
                // icon : html_assets.icon()
            }

            return result
        },
    html:
    {
        head:Header,
        body_start:BodyStart,
        // (optional)
        // Allows for wrapping React page component with arbitrary elements
        // (or doing whatever else can be done with a React element).
        // Returns either a React element or an array of React elements
        // which will be inserted into server rendered webpage's <body/>
        body: reactPageElement => reactPageElement

    },
    // loading: <div className="loading">Loading...</div>
     loading: <div className="loading"><Spinner style={{ opacity: 0.1 }}/></div>,
    // (optional)
    // Initializes Redux state before performing
    // page preloading and rendering.
    //
    // If defined, this function must return an object
    // which is gonna be the initial Redux state.
    //
    // `request` is the original HTTP request for the webpage.
    // It can be used, for example, to load the currently
    // logged in user info (user name, user picture, etc).
    //
    initialize: async(httpClient, {request}) => {
        //const user = await http.get(`/users/current`)
        //得到初始 state
        console.log("httpClient:"+httpClient)
        var data=await {present:[{text:"我当前时间为"+(new Date),completed:false},
        {text:"服务端测试数据",completed:false}]};
        //模拟数据
        const authentication={authentication:{
            user:{
                id:"001",
                name:"张三",
                role:"administrator"
            }
        }
        }
        const state =
        {
            authentication:authentication,
            visibilityFilter: "SHOW_ALL",
            todos:data
            // default:{
            // authentication:authentication,
            // visibilityFilter: "SHOW_ALL",
            // todos:data
            // },
            // authentication: { user },
            // Is used by "material-ui" for CSS autoprefixing
            // navigator: { userAgent: request.headers['user-agent'] }
        }

         return state;
    },
     // (or same without `async`: (httpClient, { request }) => Promise.resolve({})

    // (optional)
    //
    // Returns an object of shape `{ locale, messages }`,
    // where `locale` is the page locale chosen for this HTTP request,
     // and `messages` are the translated messages for this `locale`
    // (an object of shape `{ "message.key": "Message value", ... }`).
    //
    // The returned object may optionally have
    // the third property `messagesJSON`
    // to avoid calculating `JSON.stringify(messages)`
    // for each rendered page (a tiny optimization).
    //
    // `preferredLocales` argument is an array
    // of the preferred locales for this user
    // (from the most preferred to the least preferred)
    //
    // localize:(store, preferredLocales) => {
    //     const loader=require('../../abc-framework/international/loader').default;
    //     return loader;
    // }
    localize: (store, preferredLocales) => {
            console.log("preferredLocales,",preferredLocales)
            const data=require('../../abc-framework/international/translations/zh').default;
            return {
                locale: 'zh',
                messages: data
            }
    },

    authentication: {
        // If this parameter is set,
        // then the page rendering server
        // will try to extract JWT authentication token
        // from this cookie (if present),
        // and then it will always pass the token as part of the
        // "Authorization: Bearer {token}" HTTP header
        // when using `http` utility inside Redux actions.
        cookie: 'jwt-cookie-name',
        // cookie: 'authentication',
        // (optional)
        // The HTTP header containing authentication token
        // (e.g. "Authorization: Bearer {token}").
        // Is "Authorization" by default.
        header: 'Authorization'

       },
    },
    settings);

server.use(compress({
    filter: function (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH
}))

// server.use(etag());
// var router = require('koa-router')();
// var db = {
//     tobi: { name: 'tobi', species: 'ferret' },
//     loki: { name: 'loki', species: 'ferret' },
//     jane: { name: 'jane', species: 'ferret' }
// };
//
// var pets = {
//     list: function *(){
//         var names = Object.keys(db);
//         this.body = 'pets: ' + names.join(', ');
//     },
//
//     show: function *(name){
//         var pet = db[name];
//         if (!pet) return this.throw('cannot find that pet', 404);
//         this.body = pet.name + ' is a ' + pet.species;
//     }
// };
//
// router.get('/pets', pets.list);
// router.get('/pets/:name', pets.show);
// //////////////////////////////////////
// var resouce={
//     dist: async function () {
//        await staticServer(dist);
//     },
//     external:async function(){
//         await staticServer(external)
//     },
//     build: async function (){
//         const build='d:\DevT\abc-react-end\react-redux-tutorial-master\react-bootstrap-getting\build\app.js'
//         await staticServer(build)
//     }
// }
// router.get('/dist', resouce.dist);
// router.get('/external',resouce.external );
// router.get('/build', resouce.build);
// server
//     .use(router.routes())
//     .use(router.allowedMethods());

server.listen(port, function(error)
{
    if (error)
    {
        // throw error
        console.error('error服务端异常:',error)
    }

    console.log(`Webpage rendering server is listening at http://${host}:${port}`)
})

// server.use(staticServer(repoRoot))
// Start webpage rendering server on port 3000
// (`server.listen(port, [host], [callback])`)

// var router = require('koa-router')();
//
//
// var db = {
//     tobi: { name: 'tobi', species: 'ferret' },
//     loki: { name: 'loki', species: 'ferret' },
//     jane: { name: 'jane', species: 'ferret' }
// };
//
// var pets = {
//     list: function *(){
//         var names = Object.keys(db);
//         this.body = 'pets: ' + names.join(', ');
//     },
//
//     show: function *(name){
//         var pet = db[name];
//         if (!pet) return this.throw('cannot find that pet', 404);
//         this.body = pet.name + ' is a ' + pet.species;
//     }
// };
//
// router.get('/pets', pets.list);
// router.get('/pets/:name', pets.show);
// //////////////////////////////////////
// app.use(staticServer(dist));
// app.use(staticServer(external))
// app.use(staticServer(build))
// var resouce={
//     dist: async function () {
//        await staticServer(dist);
//     },
//     external:async function(){
//         await staticServer(external)
//     },
//     build: async function (){
//         const build='d:\DevT\abc-react-end\react-redux-tutorial-master\react-bootstrap-getting\build\app.js'
//         await staticServer(build)
//     }
// }
// router.get('/dist', resouce.dist);
// router.get('/external',resouce.external );
// router.get('/build', resouce.build);
// app
//     .use(router.routes())
//     .use(router.allowedMethods());
//
//
// var app = koa();
// const test=__dirname + '/test.text';
// console.log("test,",test);
// console.log("dist,",dist);
// console.log("external,",external);
// console.log("build,",build);
// app.use(staticServer("."));
//
// app.use(staticServer(test));
// app.use(staticServer(build));
// app.use(staticServer(external))
// app.use(staticServer(dist))
// app.use(staticServer(repoRoot))
// app.listen(port, function(error)
// {
//     if (error)
//     {
//         throw error
//     }
//
//     console.log(`Webpage rendering server is listening at http://localhost:3010`)
// })

