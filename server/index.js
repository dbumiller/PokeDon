const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const router = require('./router.js');
const path = require('path');

var server = express();
const port = 3000;

server.use(morgan('dev'));
server.use(bodyparser.json());
server.use(express.static(path.join(__dirname, '../client/dist')));
server.use('/api', router);

server.listen(port, () => console.log(`listening on port ${port}`));