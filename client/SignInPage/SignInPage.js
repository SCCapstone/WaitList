import '../../imports/ui/body.js';
import '../../imports/api/students';

if(Meteor.isClient){
    
    Template.home.events({
        "submit #student-form": function(event) {
            event.preventDefault();
            var textService = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{Disclaimer:1, _id:0}}).Disclaimer;
            var phoneNumber = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{PhoneNumber:1, _id:0}}).PhoneNumber;
            phoneNumber = "+1" + phoneNumber;
            if(textService == true) {
                Meteor.call("sendSMS",phoneNumber);
            }
            console.log(phoneNumber);
            console.log(textService);
            swal("Success!", "You have been added to the WaitList", "success")
        }
    });
    /*Template.home.twilioPhoneNumber = function(){
        var phoneNumber = '+18434124314'
    };*/
};

 Template.home.count = function() {
        var count = Students.find().count();
        var waitTime = count*15;
        return waitTime;
    };


