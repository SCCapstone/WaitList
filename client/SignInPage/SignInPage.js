import '../../imports/ui/body.js';
import '../../imports/api/students.js';

if(Meteor.isClient){
    
    Template.home.events({
        "submit #student-form": function(event) {
            event.preventDefault();
            var phoneNumber = '+18.....';
            Meteor.call("sendSMS", phoneNumber);
            // alert("You have been added to the WaitList");
            
            swal("Success!", "You have been added to the WaitList", "success")
        }
    });
};

 Template.home.count = function() {
        var count = Students.find().count();
        var waitTime = count*15;
        return waitTime;
    };


