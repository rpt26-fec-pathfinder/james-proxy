const Path = require('path');
let args = process.argv.slice(2);

switch(args[0]) {
  case 'production':
    require('dotenv').config({path: Path.resolve(__dirname, '../.prod.env')});
    break;
  case 'development':
    require('dotenv').config({path: Path.resolve(__dirname, '../.dev.env')})
    break;
  case 'testing':
    require('dotenv').config({path: Path.resolve(__dirname, '../.test.env')})
    break;
  default:
    process.exit(1);
}

const server = require('./app.js');

server.app.listen(server.port, ()=> {
  console.log('James FEC Proxy Server listening on port', server.port);
})