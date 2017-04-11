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
        email: 'admin@email.com',
        password: 'asdfasdf',
});

//Gives functionality for check wait time buttons
Template.header.events({
    'click .checkTime' (){
        //prompt to enter number
        var timeCheck = prompt("Please enter your phone number below");
        //checks if number is in database
        var phoneNum = Students.findOne({PhoneNumber:timeCheck});
        
        //Gives appropriate wait time or tells user they didn't enter a phonenumber correctly or that it's not in the database'
        if (timeCheck != null && phoneNum != null) {
            var waitTime = Students.findOne({PhoneNumber:timeCheck}).waitTime;
           swal("Your approximate wait time is " + waitTime + " minutes");
        }
        else if(timeCheck !=null && phoneNum == ""){
            swal("nothing entered", "error");
        }
        else {
            swal("Something went wrong", "Your phone number was not found on the wait list, " +
                 "make sure you entered your number correctly and have filled out the " +
                 "form below.", "error");
        }
    }
});