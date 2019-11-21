'use strict';
// update/replace entities
exports.update = (entitiesToUpdate, existingModel) => { //both comming as object
    for (let key in entitiesToUpdate) {
        if (entitiesToUpdate[key])
            existingModel[key] = entitiesToUpdate[key]; //change if exist otherwise add in it
    }
    return existingModel;
};

