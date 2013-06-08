/*
 * Module dependencies
 */
var connect = require('connect');

/*
 * Create server
 */
var server = connect.createServer();

/*
 * Handle static files
 */
server.use(connect.static(__dirname + '/website'));
server.use(connect.logger('dev'));

server.listen(3000);
