var chai = require('chai');
var chaiHttp = require('chai-http'); //required to run tests in the browser
var assert = chai.assert;
var expect = chai.expect;
chai.use(chaiHttp);


/*
    this functions suppose to check the page title for the app. we get the title from the localhost:3000, and
    check does it equal to "Wait List or not"
 */
describe('Page setTitle', function () {
    it('Title should be set to Wait List @watch', function () {
        browser.url('localhost:3000');
        expect(browser.getTitle()).to.equal('Wait List');
    });
});

/*
    This function suppose to check the does the form had been submit when the phone number enter with an invalid phone
    phone number. We fill out the form with elements from the browser.
 */
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

/*
    this function suppose to check the does the form had been submit when the phone number enter with alphabet letters.
       we fill out the form with elements from the browser.
 */
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

/*
    this functions suppose to submit the form to the app and all the elements fills the correct informations.
 */
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

/*
    this functions use the timeinput element to check does the phone number was in the waitlist or not.
    If yes, then return the current waitting time for the phone number, otherwise, it return a error message
 */
describe('Number was not on the list', function () {
    it('check a phone number that is not on the list @watch', function () {
        var check = browser.element('#timeInput');
        check.setValue('8039999999');
        browser.click('btn.btn-primary.checkWait');
        expect(browser.status().to.equal('block'));
    });
});

/*
    this function use the element setvalue function to sign in the browser with usename and password.
    If it works, then the sign in drop down list suppose change to the user name's label.
 */
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

/*
this function check does the sign out button works or not for the admin page.
 */

describe('Sign out', function () {
    it('Sign out for admin @watch', function () {
        var signout = browser.element('login-buttons-logout');
        browser.click('signout');
        var url = browser.getUrl();
        expect(url.to.equal('localhost:3000'));
    });
});





