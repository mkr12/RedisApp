require('should');
let HeaderHelper = require('../Helpers/header-helper');

describe('getJWTToken', function() {
    let instance = null;

    beforeEach(function() {
        instance = new HeaderHelper();
    });

    it('should return proper data', function() {
        let key =  instance.getJWTToken('Bearer token');

        key.should.eql('token');
    });

    it('should return empty string when header is null', function() {
        let key =  instance.getJWTToken(null);

        key.should.eql('');
    });

    it('should return empty string when header is undefined', function() {
        let key =  instance.getJWTToken(undefined);

        key.should.eql('');
    });

    it('should return empty string when header not start with Bearer', function() {
        let key =  instance.getJWTToken('Fake token');

        key.should.eql('');
    });

    it('should return empty string when header has not 2 parts', function() {
        let key =  instance.getJWTToken('Bearertoken');

        key.should.eql('');
    });
});