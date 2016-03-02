const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const serveWebpackClient = require('serve-webpack-client');
const app = express();

const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || 'https://project-reflect-api.herokuapp.com/';

const proxyOptions = {
  target: API_URL,
  changeOrigin: true,
};

const proxy = httpProxy.createProxyServer(proxyOptions);

app.use('/api', (req, res, next) => {
  req.url = '/api' + req.url;
  return proxy.proxyRequest(req, res);
});

app.use(serveWebpackClient({
  distPath: path.join(__dirname, 'public'),
  indexFileName: 'app.html',
  webpackConfig: require('./webpack.config'),
}));

const http = require('http');
const server = http.createServer(app);
server.listen(PORT, (err) => {
  if (err) throw err;
  const addr = server.address();
  console.log(`listening on port ${PORT}`);
})
