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


describe("Integration/E2E Testing", function() {

  // start at root before every test is run
  beforeEach(function() {
    browser.url('localhost:3000');
  });

  // test default route
  it('should jump to the /home path when / is accessed', function() {
    browser().navigateTo('#/');
    expect(browser().location().path()).toBe("/login");
  });

  it('ensures user can log in', function() {
    browser().navigateTo('#/login');
    expect(browser().location().path()).toBe("/login");

    // assuming inputs have ng-model specified, and this conbination will successfully login
    input('email').enter('test@test.com');
    input('password').enter('password');
    element('submit').click();

    // logged in route
    expect(browser().location().path()).toBe("/dashboard");

    // my dashboard page has a label for the email address of the logged in user
    expect(element('#email').html()).toContain('test@test.com');
  });

  it('should keep invalid logins on this page', function() {
    browser().navigateTo('#/login');
    expect(browser().location().path()).toBe("/login");

    // assuming inputs have ng-model specified, and this conbination will successfully login
    input('email').enter('invalid@test.com');
    input('password').enter('wrong password');
    element('submit').click();

    expect(element('#message').html().toLowerCase()).toContain('failed');

    // logged out route
    expect(browser().location().path()).toBe("/login");

  });

});
