//// Web or Server framework that provides an abstraction for common boilerplate code
//const express = require('express');
//// Request logger middleware, to be commented out for release
//const morgan = require('morgan');
//// Allows the server to use the body in the response
//const bodyparser = require('body-parser');
//// ./ Implies a file in the same folder
//const router = require('./router.js');
//// Provides various methods for manipulating paths in a platform-independent way
//const path = require('path');
//
////Creates a new instance of an Express application
//var server = express();
//// The default port for many web servers, this allows me to alter the port in a variable instead of the string below
//const port = 3000;
//
//// Dev specifically gives color-coded messages for logging
//server.use(morgan('dev'));
//// Lets the server use the body in a response during an HTTP request
//server.use(bodyparser.json());
//// Serves the frontend to the server
//server.use(express.static(path.join(__dirname, '../client/dist')));
//// Sends any request that is routed through /api to the router
//server.use('/api', router);
//
//// Tells the server to listen to requests going to the port variable
//server.listen(port, () => console.log(`listening on port ${port}`));

import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { FileURLToPath } from 'url';

// Explicitely imports router with a .js extension for NodeNext ESM compatability
import router from './router.js';

// Enforces strict typing on Express application instance
const server: Application = express ();
const port: number = 3000;

// Dynamic environmental logging architecture
// Only runs morgan logging in development; omits in production to maximize performance
if (process.env.NODE_ENV !== 'production') {
  server.use(morgan('dev'));
}

server.use(bodyParser.json());

// Handles ESM __dirname compatability
// Safely derives __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serves the frontend static client bundles
server.use((express.static(path.join(__dirname, '../client/dist'))));

// Mounts typed API endpoints
server.use('/api', router);

server.listen(port, () => {
  console.log(`Server actively listening on port ${port}`);
});