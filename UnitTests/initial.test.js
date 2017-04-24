

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



describe('phoneNumber',function(){
   it('phoneNumber should only has 10 digits',function(){
   

    var PhoneNumber=803414214;
          chai.request('http://localhost:3000')

          assert.lengthOf('PhoneNumber', 11, 'The phone number only has 10 digit');


});
});


describe('Admin Page Title', function () {
    it('should be set to Administrator Page', function () {

        chai.request('http://localhost:3000')

        assert.equal('Admin Page', 'Admin Page', 'title is equal')
    });

});


describe('Login', function () {
    it('should login', function() {
    
     var email = 'redmonc2@email.sc.edu'  ;

           chai.request('http://localhost:3000')
           
          
 .put('/login')
           .send({ email: 'redmonc2@email.sc.edu', password: 'asdfasdf' })
           .end(function (err, resp) {
               expect(err).to.be.null;
               expect(res).to.have.status(200);
               expect(resp.body).to.have.property(email);

              expect(resp.body.email).to.equal("redmonc2@email.sc.edu");
    
              expect(resp.body).to.have.property(password);
             expect(resp.body.password).to.equal("asdfasdf");
            done(); 
           });

    });

});


describe('Add Form', function () {
    it('should add a new form', function () {

        chai.request('http://localhost:3000')
            .put('addForm')

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
                expect(resp.body.Name).to.equal("Eddie");
                expect(res).to.have.property(PhoneNumber);
                expect(resp.body.PhoneNumber).to.equal("854-517-2770");
                expect(res).to.have.property(VipID);
                expect(resp.body.VipID).to.equal("11875095");
             
                expect(res).to.have.property(ReasonForVisit);

                expect(resp.body.ReasonForvisit).to.equal("Change Major");
                expect(res).to.have.property(CurrentMajor);
                expect(resp.body.CurrentMajor).to.equal("Computer Engineering");
           
                expect(res).to.have.property(IntendedMajor);
                expect(resp.body.IntendedMajor).to.equal("Business");

                expect(res).to.have.property(Comments);
                expect(resp.body.Comments).to.equal("No comments");
                expect(Disclaimer).to.be(true);
            });

    });

});   


describe('Send Email', function () 
			{ 
   
    it('should send email to student', function () {

        chai.request('http://localhost:3000')

            .put
 		('sendEmail')

            .send
		({ address: 'bli@email.sc.edu ',

                    subject: 'none ',

                    message: 'hello '
              })

              .end
			(function (err, res) {
 
                expect(res).to.have.property(address);
              
		  expect(res).to.have.property(subject);
               
 		 expect(res).to.have.property(message);
            });

    });

   it('it should  check the  page title', function () {

        chai.request('http://localhost:3000')
            .put('sendEmail')

        assert.equal('Send Email', 'Send Email', 'title should be equal')



});
}); 


describe('Reset Password', function () {

    it('should reset password', function () {

        chai.request
			('http://localhost:3000')

            .put
		('resetPassword')

            .send({ email: 'redmonc2@email.sc.edu'
              })
       
             

            .end
		(function (err, res) {
               
		 expect(res).to.have.property(email);
            });

    });

it(' Check page title', function () {

        chai.request('http://localhost:3000')
            .put('Reset Password')

        assert.equal('Reset Password', 'Reset Password', 'Title should be equal')

    });



}); 




