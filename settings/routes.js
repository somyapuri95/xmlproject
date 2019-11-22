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
            action: 'POST',       // store json response
            method: 'store'
        },{
            action: 'GET',          // view all json xml
            method: 'read',
           
        },
        {
            action: 'GET',          // view all json xml
            method: 'allreadValue',
            url: '/values'
        },{
            action: 'PUT',
            method: 'updateValue', // update api
            url: '/values/:id'
        }, {
            action: 'GET',  // read on xmltojson api
            method: 'readOne',
            url: '/values/:id'
        }]);


};