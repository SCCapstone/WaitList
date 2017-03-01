import '../../imports/ui/body.js';


if(Meteor.isClient){
    Template.home.events({
        "submit #student-form": function() {
            Meteor.call("sendSMS");
            // alert("You have been added to the WaitList");
            swal("Success!", "You have been added to the WaitList", "success")
        }
})
};