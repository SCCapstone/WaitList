import '../../imports/ui/body.js';
import '../../imports/api/students';


Template.home.onCreated(function() {//This is not needed,only for testing purposes to access database from sign-in page
    Meteor.subscribe("allStudents");
});

Template.home.helpers({
    waitTime: function() {
        var totalCount = Students.find().count();
        var waitTime = totalCount*15;
        return waitTime;
    }
})
AutoForm.hooks({
    studentForm:
    {
        onSuccess: function (insert,result) {
            var textService = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{Disclaimer:1, _id:0}}).Disclaimer;
            var phoneNumber = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{PhoneNumber:1, _id:0}}).PhoneNumber;                     
            phoneNumber = "+1" + phoneNumber;
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
