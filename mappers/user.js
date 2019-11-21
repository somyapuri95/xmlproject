'usee strict';
////Underscore is used for manipulating collections in javascript
const _ = require('underscore');
//exports toModel object item response
exports.toModel = (entity) => {
    const model = {
        id: entity._id.toJSON() || entity.id,
        username: entity.username,
        phone: entity.phone,
        email: entity.email,
        gender: entity.gender,
        token: entity.token,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
    };
    return model;
}

// pagination response with array
exports.toSearchModel = entities => {
    //mapped object reponse
    return _.map(entities, exports.toModel);
};

// token response 
exports.toAuthModel = (entity) => {
    ///exports toModel object item response
    let model = exports.toModel(entity);
    model.token = entity.token;
    return model;
}
