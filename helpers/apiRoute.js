'use strict';
//Underscore is used for manipulating collections in javascript
let _ = require('underscore');
// set response  paging, data, suscess or failue
let responseHelper = require('./response');
// require debugger
let logger = require('./logger')();

/** 
     *
     * @method route url setting
     *
     */


let responseDecoratorFn = function(req, res, next) {
    // start debugger request as any method or url
    res.log = logger.start(req.method + ' ' + req.url);
    //if require value not true used debug break
    if (req.body) {
        res.log.debug(req.body);
    }
    // generate response with used response file
    let wrapper = responseHelper(res);
    res.failure = wrapper.failure;
    res.success = wrapper.success;
    res.page = wrapper.page;
    res.pageWithPaging = wrapper.pageWithPaging;
    res.data = wrapper.data;
    next();
};


module.exports = function(app) {
// let chosse variable
    let apiRoot, requiredModule;
    //let choose array varible
    let tasks = [];
// filters or option function let chosse on variable
    let register = function(option, filters) {
//agr empty return requiredModule
        if (_.isEmpty(requiredModule)) {
            return;
        }
// array push 'responseDecoratorFn' function
        tasks.push(responseDecoratorFn);
// routes url used any case query like filter, params any id used any method(create, delete,put...more)
     //thats setting constantly thats file used setting/routes
        if (typeof(option) === "string" && option.toUpperCase() === 'REST' ||
            typeof(option) === "string" && option.toUpperCase() === 'CRUD') {
            if (filters) {
                tasks.push(filters);
            }
            (function() {
                let apiUrl = apiRoot + '/:id';

                if (requiredModule.get) {
                    tasks.push(requiredModule.get);
                    app.get(apiUrl, tasks);
                    tasks.pop();
                }
                if (requiredModule.search) {
                    tasks.push(requiredModule.search);
                    app.get(apiRoot, tasks);
                    tasks.pop();
                }
                if (requiredModule.update) {
                    tasks.push(requiredModule.update);
                    app.put(apiUrl, tasks);
                    tasks.pop();
                }
                if (requiredModule.create) {
                    tasks.push(requiredModule.create);
                    app.post(apiRoot, tasks);
                    tasks.pop();
                }
                if (requiredModule.delete) {
                    tasks.push(requiredModule.delete);
                    app.delete(apiUrl, tasks);
                    tasks.pop();
                }

            })();
        }
////come as array or object
        if (typeof(option) === "object" && !filters) { 
            let options = [];

            if (option[0]) {
                options = option;
            } else {
                options.push(option);
            }

            options.forEach(function(item) {
                let filters = [];

                filters = item.filters ? item.filters : [];

                if (item.filter) {
                    filters.push(item.filter);
                }

                filters.forEach(item => tasks.push(item));

                tasks.push(requiredModule[item.method]);

                let apiUrl = item.url ? apiRoot + item.url : apiRoot;

                switch (item.action.toUpperCase()) {
                    case "GET":
                        app.get(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    case "POST":
                        app.post(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    case "PUT":
                        app.put(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    case "DELETE":
                        app.delete(apiUrl, tasks);
                        tasks.splice(1, filters.length + 1);
                        break;

                    default:
                        break;
                }

            });
        }
        tasks = [];
        return;

    };

    return {
        model: function(apiType) {
           //define error if routes url not right
            if (apiType.charAt(apiType.length - 1) !== 's' &&
                apiType.substr(apiType.length - 2, apiType.length) !== 'es') {
                throw ('enter correct api');
            }
      //define routes url  right path
            apiRoot = '/api/' + apiType;
            requiredModule = require(`..${apiRoot}`);
            return { register: register };
        }
    };
};