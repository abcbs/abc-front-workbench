import 'colors';
import express from 'express';
import httpProxy from 'http-proxy';
import http from 'http';
import ip from 'ip';
import path from 'path';
//压缩
import compression from 'compression';
import PrettyError from 'pretty-error';
//
import client from './Render';
import info from '../../abc-framework/utils/logger'
import {options} from './abc-args';
//
const development = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || options.port||3000;
const host = process.env.host || options.host||'localhost';
const apiHost = process.env.apiHost || options.apiHost||'localhost';
const apiPort = process.env.apiPort || options.apiPort||'3030';

const targetUrl = 'http://' +apiHost + ':' + apiPort;
const pretty = new PrettyError();

//
const app = new express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
    target: targetUrl,
    ws: true
});
const publicPath=options.publicPath;
const repoRoot = path.resolve(__dirname, publicPath||'../../../');

// which prevents the need for extensions
// app.set('view engine', 'jade');
// set views for error and 404 pages
// app.set('views', repoRoot + '/build');
var dist=path.join(repoRoot, '/dist');
var external=path.join(repoRoot, '/external');

var build=path.join(repoRoot, '/build');
//压缩策略
app.use(compression());
//静态路径
app.use('/dist', express.static(dist));
app.use('/external', express.static(external));
app.use('/build', express.static(build));
//服务端代理
// Proxy to API server
app.use('/api', (req, res) => {
    proxy.web(req, res, {target: targetUrl});
});

app.use('/ws', (req, res) => {
    proxy.web(req, res, {target: targetUrl + '/ws'});
});

server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
});
//请求处理
app.use(client);
//
// app.use(function(request, response)
// {
//     proxy.web(request, response, { target: 'http://localhost:3010' })
// })
//异常处理
app.use(function(err, req, res, next){
    // log it
    if (!module.parent) console.error(pretty.render(err.stack));
    // error page
    if (err) {
        console.error(pretty.render(err))
    }

    res.status(500).end('Server Error or Loading');
});

// app.listen(port, function(error) {
//     if (error) {
//         console.error(error)
//     } else {
//         console.info("==>browser.", port, port)
//     }
// });

if (port) {
    server.listen(port, (err) => {
        if (err) {
            console.error(err);
        }
        console.info('----\n==> ✅  %s is running, talking to API server on %s.', apiHost,apiPort);
        console.info('==> 💻  Open http://%s:%s in a browser to view the app.', host, port);
    });
} else {
    console.error('==>     ERROR: No PORT environment variable has been specified');
}