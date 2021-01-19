const path = require('path');
const express = require('express');
const server = express();
const port = process.env.PORT || 3000;

console.log(`NODE_ENV=${process.env.NODE_ENV}, user static middleware ${process.env.USE_STATIC_MIDDLEWARE}`);

const staticRoot = path.join(__dirname, '../client/dist');
if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const config = require('../webpack.config.dev.js');
  const compiler = webpack(config);
  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
  });
  
  const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddleware);
}

if (process.env.USE_STATIC_MIDDLEWARE === 'true' || process.env.NODE_ENV === 'development') {
  console.log(`using static middleware, root at ${staticRoot}`);
  server.use(express.static(staticRoot));
}

server.listen(port, () => console.log(`node server running on ${port}`));
