"use strict";

let configuration = {
    REDIS_HOST: process.env['REDIS_HOST'],
    REDIS_PORT: process.env['REDIS_PORT'],
    JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
    APP_PORT: process.env['APP_PORT']
}

let missingFields = [];
for (let fieldName in configuration) {
    if (!configuration[fieldName]) {
        missingFields.push(fieldName);
    }
}

if (missingFields.length > 0) {
    console.error(`Please fill environment variables: ${missingFields}`);
   throw Error('Missing environment variables');
}

module.exports = configuration;