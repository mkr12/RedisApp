require('should')
var redisKeyHelper = require('../Helpers/redis-key-helper')

describe('getRedisKey', function() {
    let instance = null;

    beforeEach(function() {
        instance = new redisKeyHelper.RedisKeyHelper();
    });

    it('should return proper data for admin group', function() {
        let key =  instance.getRedisKey('Key1', redisKeyHelper.adminGroup);

        key.should.eql('Admin_Key1.json');
    });

    it('should return proper data for user group', function() {
        let key =  instance.getRedisKey('Key2', redisKeyHelper.userGroup);

        key.should.eql('User_Key2.json');
    });

    it('should return empty string when key is null', function() {
        let key =  instance.getRedisKey(null, redisKeyHelper.adminGroup);

        key.should.eql('');
    });

    it('should return empty string when key is undefined', function() {
        let key =  instance.getRedisKey(undefined, redisKeyHelper.adminGroup);

        key.should.eql('');
    });

    it('should return empty string when group is null', function() {
        let key =  instance.getRedisKey('Key3', null);

        key.should.eql('');
    });

    it('should return empty string when group is undefined', function() {
        let key =  instance.getRedisKey('Key4', undefined);

        key.should.eql('');
    });
});