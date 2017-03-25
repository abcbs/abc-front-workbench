var webpack = require('webpack');
import webpackDevMiddleware  from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import httpProxy from 'http-proxy';
import http from 'http';
import {options} from './config/config.path';
//
var config = require('./webpack.config');
var express = require('express');
var path = require('path');
var app = new (require('express'))();

const development = process.env.NODE_ENV !== 'production';

const port = process.env.PORT || options.port||3000;
const host = process.env.host || options.host||'localhost';
const apiHost = process.env.apiHost || options.apiHost||'localhost';
const apiPort = process.env.apiPort || options.apiPort||'3030';

const targetUrl = 'http://' +apiHost + ':' + apiPort;

var publicPath=config.default.output.publicPath;
var compiler = webpack(config.default);
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});
compiler.outputPath="/"+publicPath
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: publicPath }));

app.use(webpackHotMiddleware(compiler));


app.use('/dist', express.static(path.join(__dirname, './dist')));
app.use('/external', express.static(path.join(__dirname, './external')));
//ApplicationIndex
app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html');

})

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + '/index.html');
//
// })

app.use(function(err, req, res, next){
  // log it
  console.error(err.stack);
  // error page
  res.status(500).render('5xx');
});

server.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});
