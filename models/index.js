'use strict';
//File I/O is provided by simple wrappers File System
let fs = require('fs');
// let choose mongoose schema
let mongoose = require('mongoose');

let init = function () {
    if (global._models_init) {
        return;
    }
   //path of the currently running file.
    fs.readdirSync(__dirname).forEach(function (file) {
        if (file.indexOf('.js') && file.indexOf('index.js') < 0) {
            require('./' + file);
        }
    });
    global._models_init = true;
};

init();
//export mongoose
module.exports = mongoose.models;