"use strict";

const groupRegex = "admin|user"
const adminGroup = "admin";
const userGroup = "user";

class RedisKeyHelper {
    getRedisKey(keyName, group) {
        if (!keyName || !group) {
            return '';
        }

        switch (group) {
            case adminGroup:
                return `Admin_${keyName}.json`;
            case userGroup:
                return `User_${keyName}.json`;
            default:
                return '';
        }
    }
}

module.exports = {
    RedisKeyHelper,
    adminGroup,
    userGroup,
    groupRegex
}