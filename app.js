/*
 *const createError = require('http-errors');
 *Express, is a web application framework require
 */
const express = require('express');
// ransfer data over the Hyper Text Transfer Protocol (HTTP)
const http = require('http');
// Configurations are stored in configuration files within  application
const config = require('config').get('webServer');
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
const cors = require('cors');
// logging library that combines the simple APIs of  browser-js console.log()
const logger = require('./helpers/logger')('app');
const app = express();
app.use(cors());
// path of the currently running file.
app.use(express.static(__dirname + '/api/uploads'));

try {
    // request important files
    require('./settings/database').configure();
    require('./settings/express').configure(app);
    require('./settings/routes').configure(app);
} catch(err){
    console.log(err);
}

app.use((err, res, next) => {
    if (err) {
        res.send(500, { error: err });
        return;
    }
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
// set environment
const server = http.createServer(app);
logger.info('environment: ' + process.env.NODE_ENV);

logger.info('starting server');
// connecting port
server.listen(config.port, function () {
    logger.info('listening on port:' + config.port);
    console.log('listening on port:' + config.port);
});

module.exports = app;
