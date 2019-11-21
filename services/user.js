'use strict';
//A library to help you hash passwords.
const bcrypt = require('bcrypt-nodejs');
////Underscore is used for manipulating collections in javascript
const _ = require('underscore');

exports.comparePassword = async(password, hash) => {
    //compare password with hash
    return new Promise(async(resolve) => {
        bcrypt.compare(password, hash, function(err, isPasswordMatch) {
            //if not match return false
            if (err) {
                return resolve(false);
            }
            //resolve response
            return resolve(isPasswordMatch);
        });
    });
}

exports.setPassword = async(password) => {
    return new Promise(async(resolve) => {
//bcrypt.genSalt of bcrypt npm package
        bcrypt.genSalt(10, function(err, salt) {
            // if errr
            if (err) {
                return resolve();
            }
            // not error response shoe hash password
            bcrypt.hash(password, salt, null, function(hash) {
                return resolve(hash);
            });
        });
    });
}

