/* eslint-disable no-async-promise-executor */
'use strict';
// A library to help you hash passwords.
const bcrypt = require('bcrypt-nodejs');
// //Underscore is used for manipulating collections in javascript
const _ = require('underscore');

exports.comparePassword = async(password, hash) => {
    // compare password with hash
    return new Promise(async(resolve) => {
        bcrypt.compare(password, hash, function(err, isPasswordMatch) {
            // if not match return false
            if (err) {
                return resolve(false);
            }
            // resolve response
            return resolve(isPasswordMatch);
        });
    });
};

exports.setPassword = async(password) => {
    return new Promise(async(resolve) => {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return resolve();
            }
            bcrypt.hash(password, salt, null, function(err, hash) {
                return resolve(hash);
            });
        });
    });
};

