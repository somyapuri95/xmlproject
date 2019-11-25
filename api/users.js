/* eslint-disable no-undef */
'use strict';
// set json reponse this file
const mapper = require('../mappers/user');
// generate token authorization middlewares
const auth = require('../middlewares/authorization');
// value update schema
const updationScheme = require('../helpers/updateEntities');


/**
 * user account login api
 *
 * @method signin
 * @body  {String} req.body.username , req.body.password
 * @returns {Object} user details
 *
 */

exports.signin = async(req, res) => {
    // string value used body
    let username = req.body.username;
    let password = req.body.password;
    // Agr Body Main Username or Password Missing Hai Genrate failure response
    if (!username)
        return res.failure('enter username');
    if (!password)
        return res.failure('enter password');

    try {
        // Require db find username
        let user = await db.user.findOne({ 'username' : username });
        if (!user) {
            throw 'User Not Found';
        }else{
            return res.data(mapper.toAuthModel(user));
        }
        /*
         * if user not found username get error
         *
         * used userService for compare hash password
         */
        /*
         *   var isPasswordMatch = await userService.comparePassword(password, user.password);
         * if matched password require body password get response otherwise error
         *  if (isPasswordMatch) {
         */
      
        /*
         * not matched response show error
         * } else {
         *     return res.failure('Invalid username or password.');
         * }
         */
    } catch (e) {
        return res.failure(e);
    }
};

/**
 * user account register api
 *
 * @method signUp
 * @body  {String} req.body.username , req.body.password, req.body.phone, req.body.gender,req.body.password
 * @returns {Object} user details
 *
 */
exports.signUp = async (req, res) => {
    // username is unique so, body require username
    let username = req.body.username;
    try {
        // Require db find username
        let user = await db.user.find();
        // if user not found username get error
        if (!user) {
            throw 'User Not Found';
        }
        // string value used body
        let data = {
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            password: req.body.password
        };
        // db save data
        user = await new db.user(data).save();
        // than generate token for security
        user.token = auth.getToken(user);
        // that also save db
        user = await user.save();
        // get reponse all save return
        return res.data(mapper.toModel(user));
    } catch (e) {
        return res.failure(e);
    }
};

/**
 * password update api
 *
 * @method update
 * @param id
 * @body  {String}  req.body.password
 * @returns {Object} user details
 *
 */
exports.update = async(req, res) => {
    // req.body let variable 'model'
    let model = req.body;
    try {
        // uder db find params put id
        let  user = await db.user.findById(req.params.id);
        // Agr nhi hai than response failure
        if (!user) {
            return res.failure('user not found');
        }
        // body main diyae gye password ko variable password main lye liyea hai
        let password = model.password;
        delete model.password;
        // require body data upadte enntity
        user = updationScheme.update(model, user);
        // body password set hash after replacing used userservice
        if (password) {
            var hash = await userService.setPassword(password);
            user.password = hash;
        }
        // than save db
        user = await user.save();
        // response show as json
        return res.data(mapper.toModel(user));
    } catch (e) {
        return res.failure(e);
    }
};