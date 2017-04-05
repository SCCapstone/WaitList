import { Template } from 'meteor/templating';
import { students } from '../api/students.js';
import './body.html';

Accounts.config({
    forbidClientAccountCreation : true
});

Accounts.createUser({
        email: 'admin@email.com',
        password: 'asdfasdf',
});

Template.checkWaitTime.events({
    'click .checkTime' (){
        var timeCheck = prompt("Please enter your phone number below");
        var phoneNum = Students.findOne({PhoneNumber:timeCheck});
        console.log(timeCheck);
        console.log(phoneNum);

        //still working on this to show individual's wait time
        //we can use the rank attribute and just multiply that by 15 to get wait time
        var waitTime = Students.findOne({PhoneNumber:timeCheck}).rank;
        waitTime = waitTime * 15;

        //var waitTime = Students.findOne({PhoneNumber:timeCheck}).waitTime;
        console.log(waitTime);

        if (timeCheck != null && phoneNum != null) {
           swal("Your approximate wait time is " + waitTime + " minutes");
        }
        else {
            swal("Something went wrong", "Your phone number was not found on the wait list, " +
                 "make sure you entered your number correctly and have filled out the " +
                 "form below.", "error");
        }
    }
});