import '../../imports/ui/body.js';
import '../../imports/api/students';

if(Meteor.isClient){
    
    Template.home.events({
        "submit #student-form": function(event) {
            event.preventDefault();
            var textService = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{Disclaimer:1, _id:0}}).Disclaimer;
            var phoneNumber = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{PhoneNumber:1, _id:0}}).PhoneNumber;
            phoneNumber = "+1" + phoneNumber;
            var totalCount = Students.find({countNumber:1}).count();
            var waitTime = "Approximate Wait Time " + totalCount*15 +" Minutes";
            if(textService == true) {
                Meteor.call("sendSMS",phoneNumber);
            }
            document.getElementById("insert").innerHTML = waitTime;
            console.log(phoneNumber);
            console.log(textService);
            console.log(totalCount);
            swal("Success!", "You have been added to the WaitList", "success")
        }
    });
    /*Template.home.twilioPhoneNumber = function(){
        var phoneNumber = '+18434124314'
    };*/
};

Template.home.onCreated(function() {
    Meteor.subscribe("allStudents");
});
