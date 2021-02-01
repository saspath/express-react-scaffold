const path = require('path');
const express = require('express');
const server = express();
const port = process.env.PORT || 3000;
const exists = require('util').promisify(require('fs').exists)

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

const staticRoot = process.env.STATIC_ROOT || path.join(__dirname, '../client/dist');
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

exists(staticRoot).then(exists => {
  if (exists) {
    console.log(`static assets directory located at ${staticRoot}`)
    server.use(express.static(staticRoot));
  }
})

server.listen(port, () => console.log(`node server running on ${port}`));
