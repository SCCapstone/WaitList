var chai = require('chai');
var chaiHttp = require('chai-http'); //required to run tests in the browser
var assert = chai.assert;
var expect = chai.expect;
chai.use(chaiHttp);


describe('Homepage', function() {
    it('should open homepage', function() {
        chai.request('http://localhost:3000')
    })
})

describe('Title', function () {
    it('should be set to Wait List', function () {

        chai.request('http://localhost:3000')

        assert.equal('Wait List', 'Wait List', 'title is equal')
    });
});

