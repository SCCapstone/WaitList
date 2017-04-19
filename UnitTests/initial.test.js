var chai = require('chai');
var chaiHttp = require('chai-http'); //required to run tests in the browser
var assert = chai.assert;
var expect = chai.expect;
chai.use(chaiHttp);
var should = chai.should();

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


describe('Login', function () {
    it('should login', function() {

        chai.request('http://localhost:3000')
            .put('/login')
            .send({ email: 'admin@email.com', password: 'asdfasdf' })
            .end(function (err, res) {
                expect(res).to.have.property(email);
                expect(res).to.have.property(password);
            });

    });

});

describe('phoneNumber',function(){
   it('phoneNumber should only has 10 digits',function(){

          chai.request('http://localhost:3000')

          assert.lengthOf('PhoneNumber', 11, 'The phone number only has 10 digit');


});
});

describe('Admin Page Title', function () {
    it('should be set to Administrator Page', function () {

        chai.request('http://localhost:3000')
            .put('/admin_overall')

        assert.equal('Admin Page', 'Admin Page', 'title is equal')
    });

});

describe('Add Form', function () {
    it('should add a new form', function () {

        chai.request('http://localhost:3000')
            .put('/addForm')

            .send({ Name: 'Eddie',
                PhoneNumber: '864-517-2770',
                VipID: '11875095',
                ReasonForVisit: 'Change Major',
                CurrentMajor: 'Computer Engineering',
                IntendedMajor: 'Business',
                Comments: 'No comments',
                Disclaimer: 'True'
            })

            .end(function (err, res) {
                expect(res).to.have.property(Name);
                expect(res).to.have.property(PhoneNumber);
                expect(res).to.have.property(VipID);
                expect(res).to.have.property(ReasonForVisit);
                expect(res).to.have.property(CurrentMajor);
                expect(res).to.have.property(IntendedMajor);
                expect(res).to.have.property(Comments);
                expect(Disclaimer).to.be(true);
            });

    });

});
