const Path = require('path');
let args = process.argv.slice(2)
args[0] === 'production' ? require('dotenv').config({path: Path.resolve(__dirname, '../.env.prod')}) :
args[0] === 'development' ? require('dotenv').config({path: Path.resolve(__dirname, '../.env.dev')}) : process.exit(1);
const server = require('./app.js');

server.app.listen(server.port, ()=> {
  console.log('James FEC Proxy Server listening on port', server.port);
})