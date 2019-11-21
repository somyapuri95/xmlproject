'use strict';
const apiRoutes = require('../helpers/apiRoute');
// let auth = require('../middlewares/authorization');
module.exports.configure = (app) => {
    let title = 'XML API';

    app.get('/', (res) => {
        res.render('index', {
            title: title
        });
    });

    app.get('/api', (res) => {
        res.render('index', {
            title: title
        });
    });
    let api = apiRoutes(app);
    // routes url (http://localhost:3000/api/)
    api.model('users')
        .register([{
            action: 'POST',
            method: 'signin', // login api user 
            url: '/signin',
        },{
            action: 'POST',
            method: 'signUp',  // signup api user 
            url: '/signup',
        },{
            action: 'PUT',
            method: 'update', // update api
            url: '/:id'
        }]);

    api.model('xmls')
        .register([{
            action: 'GET',          // view all json xml
            method: 'xmlFormat',
            url: '/kyero/format',
        },{
            action: 'GET',          // view all json xml
            method: 'kyeroFormat',
            url: '/kyero'
        },{
            action: 'POST',       // store json response
            method: 'createKyreoFormat',
            // filter: auth.requiresToken
        },{
            action: 'GET',          // view all json xml
            method: 'allkyeroformEntries',
           
        },{
            action: 'PUT',
            method: 'updateKyreoFormat', // update api
            url: '/:id'
        }, {
            action: 'GET',  // read on xmltojson api
            method: 'getKyreoFormat',
            url: '/:id'
        }]);


};