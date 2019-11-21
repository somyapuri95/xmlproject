'use strict';
//winston logger can have multiple transports configured at different levels.
let winston = require('winston');
//Configurations are stored in configuration files within  application
let logConfig = require('config').get('logger');
//let choose array
let transports = [];
//Agr value file, console or http main hai than multiple transports configured winston 
//array
if (logConfig.file) {
    transports.push(new winston.transports.File(logConfig.file));
}

if (logConfig.console) {
    transports.push(new winston.transports.Console(logConfig.console));
}

if (logConfig.http) {
    transports.push(new winston.transports.Http(logConfig.http));
}

let defaultLogger = new winston.Logger({
    transports: transports,
    exitOnError: false
});


defaultLogger.stream = {
    write: function (message) {
        defaultLogger.info(message);
    }
};


module.exports = function (ctx) {

    let logger = new winston.Logger({
        transports: transports,
        exitOnError: false
    });

   

    let stringifiedCtx = function (param) {
        if (ctx) {
            return '[' + ctx + (param ? ':' + param : '') + '] ';
        } else if (param) {
            return '[' + param + '] ';
        } else {
            return '';
        }
    };

    let insertCtx = function (params, additional) {
        if (typeof params[0] === 'string') {
            params[0] = stringifiedCtx(additional) + params[0];
        } else if (typeof params[0] === 'object') {
            Array.prototype.unshift.call(params, stringifiedCtx(additional));
        }

        return params;
    };

    let decorator = function (param) {
        return {
            error: function () {
                logger.error.apply(this, insertCtx(arguments, param));
            },
            warn: function () {
                logger.warn.apply(this, insertCtx(arguments, param));
            },
            info: function () {
                logger.info.apply(this, insertCtx(arguments, param));
            },
            verbose: function () {
                logger.letbose.apply(this, insertCtx(arguments, param));
            },
            debug: function () {
                logger.debug.apply(this, insertCtx(arguments, param));
            },
            silly: function () {
                logger.silly.apply(this, insertCtx(arguments, param));
            }
        };
    };

    let decoratorObj = decorator();

    decoratorObj.start = function (param) {
        let wrapper = decorator(param);

        wrapper.debug('started');
        return wrapper;
    };


    return decoratorObj;
};