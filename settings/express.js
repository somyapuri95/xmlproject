'use strict';
//Express, is a web application framework require
const express = require('express');
//logging library that combines the simple APIs of  browser-js console.log()
const logger = require('../helpers/logger')('express');
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property
const bodyParser = require('body-parser');
// published to the NPM registry
const path = require('path');



module.exports.configure = (app) => {
    // express configure all modules request
    app.use(function (err, req, res, next) {
        if (err) {
            (res.log || log).error(err.stack);
            if (req.xhr) {
                res.send(500, { error: 'Something blew up!' });
            } else {
                next(err);
            }
            return;
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });

    const log = logger.start('config');
//Morgan as a helper that generates request logs.
    app.use(require('morgan')("combined",{ "stream": logger.stream }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
//path of the currently running file.
    const root = path.normalize(__dirname + './../');
    app.set('views', path.join(root, 'views'));
    //ejs Embedded JavaScript templates
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(root, 'public')));


};