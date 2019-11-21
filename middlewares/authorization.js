'use strict';
//JSON Web Token (JWT) 
let jwt = require('jsonwebtoken');
//let choose global db
let db = global.db;
//Configurations are stored in configuration files within  application
let authConfig = require('config').get('auth');
//Underscore is used for manipulating collections in javascript
let _ = require('underscore');

let extractToken = (token, req, res, next) => {
     //varify secret authentication token
    jwt.verify(token, authConfig.secret, {
        ignoreExpiration: true
        //Claims-based identity is a common way for applications to acquire the identity information.
    }, function(err, claims) {
        //token required error
        if (err) {
            return res.status(403).send({
                success: false,
                message: 'token is required.'
            });
        }
//db find claims under user
        db.user.findById(claims.user)
            .then(user => {
                // agr nhi , throw error
                if (!user) {
                    throw ('no user found');
                }
               
                req.user = user;
                next();
            })
            .catch(err => {
                res.failure(err);
            });
    });
};

exports.requiresToken = (req, res, next) => {
    // token based data than used token body, query or header like
    //''x-access-token':"token"
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    //if is not in your body get error message
    if (!token) {
        return res.status(403).send({
            success: false,
            message: 'token is required.'
        });
    }

    extractToken(token, req, res, next);
};

exports.requiresTokenOptional = (req, res, next) => {
     // token based data than used token body, query or header like
    //''x-access-token':"token"
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
     // token return
    //''x-access-token':"token"
    if (token)
        return extractToken(token, req, res, next);

    req.user = null;
    next();
};

exports.getToken = user => {

    let claims = {
        user: user.id,
        phone: user.phone
    };

    return jwt.sign(claims, authConfig.secret, {
        expiresIn: authConfig.tokenPeriod || 1440
    });
};


