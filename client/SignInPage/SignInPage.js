import '../../imports/ui/body.js';
import '../../imports/api/students';


Template.home.onCreated(function() {//This is not needed,only for testing purposes to access database from sign-in page
    Meteor.subscribe("allStudents");
});

// same function as one on SignInPage
// function checkTime() {
//     var timeCheck = prompt("Please enter your phone number below");
//     var phoneNum = Students.findOne({},{fields:{PhoneNumber:1}}).PhoneNumber;
//     var total = Students.find({countNumber:1}).count();
//     if (timeCheck != null && phoneNum == timeCheck) {
//         swal("Your approximate wait time is " + total*15 + " minutes");
//     }
//     else {
//         swal("Something went wrong", "Your phone number was not found on the wait list, " +
//             "make sure you entered your number correctly and have filled out the " +
//             "form below", "error");
//     }
// };

AutoForm.hooks({
    studentForm:
{
    onSuccess: function (insert,result) {
        var textService = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{Disclaimer:1, _id:0}}).Disclaimer;
        var phoneNumber = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{PhoneNumber:1, _id:0}}).PhoneNumber;
        phoneNumber = "+1" + phoneNumber;
        var totalCount = Students.find({countNumber:1}).count();
        var waitTime = "Approximate Wait Time: " + totalCount*15 +" Minutes";
        document.getElementById("insert").innerHTML = waitTime;
        if(textService == true) {
            Meteor.call("sendSMS",phoneNumber);
        }
        //console.log(phoneNumber);
        //console.log(textService);
        //console.log(totalCount);
        swal("Success!", "You have been added to the WaitList", "success");
    },
}
});
