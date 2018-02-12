"use strict";

let jsonWebToken = require('jsonwebtoken');
let HeaderHelper = require('../Helpers/header-helper');
let redisKeyHelper = require('../Helpers/redis-key-helper');
let headerHelper = new HeaderHelper();

class AdminValidator {
    validate(req, res, next) {
        let authHeader = req.get('Authorization');
        let token = headerHelper.getJWTToken(authHeader);
        let userInformation = jsonWebToken.decode(token);
        if (userInformation.userType) {
            let userType = userInformation.userType.toLowerCase();
            if (userType !== redisKeyHelper.adminGroup) {
                res.status(401).end();
            }
            else {
                next();
            }
        }
        else {
            res.status(401).end();
        }
    }
}

module.exports = AdminValidator;