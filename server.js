const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const server = express();

// Setup server and listen to ports //
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use('/', routes);

server.listen(process.env.PORT || 8080, function() {
    console.log('Server listening on port 8080.');
});
