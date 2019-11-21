// strict mode, you can not, for example, use undeclared variables
'use strict';
// import mongoose package
const mongoose = require('mongoose');
// configuration files
const dbConfig = require('config').get('db');
// import logger file for used debugger
const logger = require('../helpers/logger')('settings.database');
//
global.toObjectId = (id) => mongoose.Types.ObjectId(id);


/**
 * mongoose configuration
 *
 * @method configure
 * @returns {Object} connection response
 * @global constantly manage db
 */

module.exports.configure = function () {
    mongoose.Promise = global.Promise;

    let connect = function () {
        logger.info('connecting to', dbConfig);
        mongoose.connect(dbConfig.host);
    };

    connect();
    // mongoose connection Connected function
    let db = mongoose.connection;
    db.on('connected', function () {
        logger.info('DB Connected');
        console.log('DB Connected');
    });
    // mongoose connection Connected Error function
    db.on('error', function (err) {
        logger.error('Mongoose default connection error: ' + err);
    });
    // mongoose connection Connected disconnected function
    db.on('disconnected', function () {
        logger.info('Again going to connect DB');
        connect();
    });
    // globally used data models folder
    global.db = require('../models');
    return global.db;
};