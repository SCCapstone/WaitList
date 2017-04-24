import { Template } from 'meteor/templating';
import { students } from '../api/students.js';
import './body.html';

//prevents other user accounts from being created
//Client only wants one user so this is not needed for us
Accounts.config({
    forbidClientAccountCreation : true
});

//Default user set up
Accounts.createUser({
        email: 'redmonc2@email.sc.edu',
        password: 'asdfasdf',
});

Template.header.onCreated(function(){
    this.subscribe("allStudents");
});

//Gives functionality for check wait time buttons, brings up modal
Template.header.events({
    'click .checkTime' (){
       Modal.show('checkWaitModal');
    },
    'click .downloadArchive' (event){
        var date = new Date();
        var dateDay = date.getDate();
        var dateMonth = date.getMonth()+1;
        var dateYear = date.getFullYear();
        var stringDate = dateMonth+"_"+dateDay+"_"+dateYear;
        var nameFile = 'WaitlistArchive'+stringDate+'.csv';
        Meteor.call('download', function (err, fileContent) {
            if (fileContent) {
                var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
                saveAs(blob, nameFile);
            }
        });
    },
    'click #login-buttons-logout'(){
        window.location.replace("http://uofscwaitlist.meteorapp.com/");
    }
});

//Gets value submitted in modal and checks collection for phone number, outputs message afterwards
Template.checkWaitModal.events({
     'click .checkWait' (){
        var timeCheck = $('[name=phone]').val();
        timeCheck = timeCheck;
        var phoneNum = Students.findOne({PhoneNumber:timeCheck});
        //Gives appropriate wait time or tells user they didn't enter a phonenumber correctly or that it's not in the database'
        if (timeCheck != null && phoneNum != null) {
            var waitTime = Students.findOne({PhoneNumber:timeCheck}).waitTime;
           swal("Your approximate wait time is \n" + waitTime + " minutes");
        }
        else {
            swal("Something went wrong", "Your phone number was not found on the wait list, " +
                 "make sure you entered your number correctly and have filled out the " +
                 "form below.", "error");
        }
    }
});

/*Template.SignInModal.events({
   'submit form' (event){
       //event.preventDefault();
       var email= $('[name=email]').val();
       var password = $('[name=password]').val();
       Meteor.loginWithPassword(email,password);
       console.log(email);
       cosole.log(password);
   }
});*/
