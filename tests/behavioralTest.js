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

describe('Fail to submitForm due to unvalid phone number', function () {
    it('Form should not be submitted @watch', function () {
        var Name = browser.element("Name");
        var PhoneNumber = browser.element("PhoneNumber");
        var ID = browser.element("USCID");
        var Reason = browser.element("ReasonForVisit");
        var Current = browser.element("CurrentMajor");
        var Intend = browser.element("IntendedMajor");
        var Comments = browser.element("Comments");
        var Disclaimer = browser.element("Disclaimer");
        /*
        Name.setValue('John');
        PhoneNumber.setValue('1111111111');
        ID.setValue('123666666');
        Reason.setValue('Change Major');
        Current.setValue('Mathematics');
        Intend.setValue('French');
        Comments.setValue('testing');
        browser.getElementById('studentForm').submit();
        var newurl = browser.getUrl();
        */
        expect(browser.getUrl()).to.equal('http://localhost:3000/');
    });
});

describe('Fail to submitForm due to have alphabet letters in phone numbers ', function () {
    it('Form should not be submitted @watch', function () {
        var Name = browser.element("Name");
        var PhoneNumber = browser.element("PhoneNumber");
        var ID = browser.element("USCID");
        var Reason = browser.element("ReasonForVisit");
        var Current = browser.element("CurrentMajor");
        var Intend = browser.element("IntendedMajor");
        var Comments = browser.element("Comments");
        var Disclaimer = browser.element("Disclaimer");
        /*
        Name.setValue('John');
        PhoneNumber.setValue('803afi2119');
        ID.setValue('123666666');
        Reason.setValue('Change Major');
        Current.setValue('Mathematics');
        Intend.setValue('French');
        Comments.setValue('testing');
        browser.getElementById('studentForm').submit();
        var newurl = browser.getUrl();
        */
        expect(browser.getUrl()).to.equal('http://localhost:3000/');
    });
});

describe('Succesful submitForm', function () {
    it('Form should be submitted @watch', function () {
        var Name = browser.element("Name");
        var PhoneNumber = browser.element("PhoneNumber");
        var ID = browser.element("USCID");
        var Reason = browser.element("ReasonForVisit");
        var Current = browser.element("CurrentMajor");
        var Intend = browser.element("IntendedMajor");
        var Comments = browser.element("Comments");
        var Disclaimer = browser.element("Disclaimer");
        Name.setValue('John');
        PhoneNumber.setValue('8037192111');
        ID.setValue('123666666');
        Reason.setValue('Change Major');
        Current.setValue('Mathematics');
        Intend.setValue('French');
        Comments.setValue('testing');
        browser.getElementById('studentForm').submit();
        var newurl = browser.getUrl();
        expect(newurl.to.equal('localhost:3000/8037192111'));
    });
});

describe('Number was not on the list', function () {
    it('check a phone number that is not on the list @watch', function () {
        var check = browser.element('#timeInput');
        check.setValue('8039999999');
        browser.click('btn.btn-primary.checkWait');
        expect(browser.status().to.equal('block'));
    });
});

describe('Admin Login', function () {
    it('Admin user now should be logged in @watch', function () {
        var email = browser.element('#login-email');
        var password = browser.element('#login-password');
        email.setValue('redmonc2@email.sc.edu');
        password.setValue('asdfasdf');
        browser.click('#login-buttons-password');
        browser.pause(6000);
        var usertext = "redmonc2@email.sc.edu";
        expect(browser.getElementById('login-name-link').to.equal(usertext));
    });
});

describe('Sign out', function () {
    it('Sign out for admin @watch', function () {
        var signout = browser.element('login-buttons-logout');
        browser.click('signout');
        var url = browser.getUrl();
        expect(url.to.equal('localhost:3000'));
    });
});





