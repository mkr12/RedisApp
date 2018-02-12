"use strict";

let express = require('express');
let app = express();
var bodyParser = require('body-parser');
let expressJWT = require('express-jwt');
let jsonSchema = require('express-jsonschema');
let userSchema = require('./Schemas/user-schema');
let genericValidator = require('./generic-validator');
let configuration = require('./configuration');
let redisKeyHelper = require('./Helpers/redis-key-helper');
let redisManager = require('./Redis/redis-manager');
let AdminValidator = require('./User/admin-validator');
let adminValidator = new AdminValidator();

app.use(bodyParser.json());
app.use(expressJWT({secret: configuration.JWT_SECRET_KEY}));

app.post(`/set_file/:name/:group(${redisKeyHelper.groupRegex})`, adminValidator.validate, jsonSchema.validate({body: userSchema.schema}), function(req, res) {
    redisManager.saveFile(req.params.name, JSON.stringify(req.body), req.params.group)
        .then(function(value) {
            res.status(200).end();
        })
        .catch(function(err) {
            res.status(err.statusCode).end();
        });
});

app.get(`/get_file/:name/:group(${redisKeyHelper.groupRegex})`, function(req, res) {
    redisManager.readFile(req.params.name, req.params.group)
        .then(function(value) {
            if (value) {
                res.type('json');
                res.send(value);
            }
            else {
                res.status(404).end();
            }
        })
        .catch(function (err) {
            res.status(err.statusCode).end();
        });
});

app.delete(`/delete_file/:name/:group(${redisKeyHelper.groupRegex})`, adminValidator.validate, function(req, res) {
    redisManager.deleteFile(req.params.name, req.params.group)
        .then(function(value) {
            if (value) {
                res.status(200).end();
            }
            else {
                res.status(404).end();
            }
        })
        .catch(function (err) {
            res.status(err.statusCode).end();
        });
});

app.use(genericValidator);

app.listen(configuration.APP_PORT, function() { console.log(`Application start on port ${configuration.APP_PORT}`); });

