'use strict';
module.exports = function(res) {
    return {
        // isSuccess reponse setting
        success: function(message, code) {
            let val = {
                isSuccess: true,
                message: message,
                code: code
            };
            res.log.info(message || 'success', val);
            //reonse design json
            res.json(val);
        },
        // failure reponse setting
        failure: function(error, message) {
            // res.status(error.status || 400);
            let val = {
                isSuccess: false,
                message: message,
                error: error.message || error.stack || error
            };
            res.log.error(message || 'failed', val);
            res.json(val);
        },
         // data reponse setting
        data: function(item, message, code) {
            // single item response
            let val = {
                isSuccess: true,
                message: message,
                data: item,
                code: code
            };
            res.log.info(message || 'success', val);
            res.json(val);
        },
        // pagination reponse setting
        page: function(items, pageNo, pageSize, totalRecords) {

            if (!pageSize)
                pageSize = items.length;

            let val = {
                isSuccess: true,
                items: items,
                total: items.length,
                pageNo: pageNo || 1,
                pageSize: items.length > pageSize ? items.length : pageSize,
                totalRecords: totalRecords || items.length
            };

            res.log.info('page', val);
            res.json(val);
        }
    };
};