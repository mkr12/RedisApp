"use strict";

let configuration = require('../configuration')
let redis = require('redis');
let redisKeyHelper = require('../Helpers/redis-key-helper');
let redisHelper = new redisKeyHelper.RedisKeyHelper();
let redisClient = redis.createClient(configuration.REDIS_PORT, configuration.REDIS_HOST);

module.exports = {
    saveFile(name, value, group) {
        let key = redisHelper.getRedisKey(name, group);
        return new Promise(function(resolve, reject) {
            if (redisClient.connected) {
                redisClient.set(key, value, function(err, reply) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(reply);
                    }
                });
            }       
        });
    },
    readFile(name, group) {
        let key = redisHelper.getRedisKey(name, group);
        return new Promise(function(resolve, reject) {
            if (redisClient.connected) {
                redisClient.get(key, function(err, reply) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(reply);
                    }
                });
            }
        });
    },
    deleteFile(name, group) {
        let key = redisHelper.getRedisKey(name, group);
        return new Promise(function(resolve, reject) {
            if (redisClient.connected) {
                redisClient.del(key, function(err, reply) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(reply === 1 ? true : false);
                    }
                });
            }
        });      
    }
}