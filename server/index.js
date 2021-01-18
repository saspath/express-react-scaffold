const path = require('path');
const express = require('express');
const server = express();
const port = process.env.PORT || 3000;

console.log(`NODE_ENV=${process.env.NODE_ENV}, user static middleware ${process.env.USE_STATIC_MIDDLEWARE}`);
if (process.env.USE_STATIC_MIDDLEWARE === 'true') {
  const staticRoot = path.join(__dirname, '../client/dist');
  console.log(`using static middleware, root at ${staticRoot}`);
  server.use(express.static(staticRoot));
}
server.listen(port, () => console.log(`node server running on ${port}`));
