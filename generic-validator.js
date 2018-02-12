"use strict";

module.exports = function(err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
        console.log(err.message);
        res.status(400);

        let responseData = {
           statusText: 'Bad Request',
           jsonSchemaValidation: true,
           validations: err.validations
        };
 
         res.json(responseData);
    }
    else if (err.status === 401) {
        res.status(401).end();
    }
    else {
        next();
    }
}