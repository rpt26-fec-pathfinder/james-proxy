const server = require('./app.js');

server.app.listen(server.port, ()=> {
  console.log('James FEC Proxy Server listening on port', server.port);
})