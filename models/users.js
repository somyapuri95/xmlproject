"use strict";
//require mongoose
let mongoose = require('mongoose');
// let choose mongoose schema
let Schema = mongoose.Schema;
// let choose mongoose schema name
let userSchema = new Schema({
  //moadel value's
 username: { type: String },
 password: { type: String },
 gender: {
   type: String,
   enum: [
     'male', 'female'
   ]
 },
 phone: { type: String, unique: false },
 email: { type: String },
 token: { type: String }, 
}, { timestamps: true });
//create model user
let user = mongoose.model('user', userSchema);
exports.user = user;

