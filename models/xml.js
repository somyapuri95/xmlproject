"use strict";
//require mongoose
let mongoose = require('mongoose');
// let choose mongoose schema
let Schema = mongoose.Schema;
// let choose mongoose schema name
let xmlSchema = new Schema({
    //moadel value's
 url:{type: String} ,
 username:{type: String} ,
}, { timestamps: true });
//create model
let xml = mongoose.model('xml', xmlSchema);
exports.xml = xml;

