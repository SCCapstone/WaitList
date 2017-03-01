var chai = require('chai');
var chaiHttp = require('chai-http'); //required to run tests in the browser
var assert = chai.assert;
var expect = chai.expect;
chai.use(chaiHttp);

describe('Page setTitle', function () {
    it('Title should be set to Wait List @watch', function () {
        browser.url('localhost:3000');
        expect(browser.getTitle()).to.equal('Wait List');
    });
});

/*
describe('Admin Login', function () {
    it('Admin should be logged in @watch', function () {
        browser.setValue('#inputEmail', 'admin@email.com');
        browser.setValue('#inputPassword', 'asdfasdf');
        browser.click('#submit');
        browser.pause(5000);
        expect(browser.getUrl()).to.equal('http://localhost:3000/adminPage');

        //browser.url('localhost:3000/admin_overall');
        var test = browser.getUrl();
        //console.log(test);
    });
});
*/