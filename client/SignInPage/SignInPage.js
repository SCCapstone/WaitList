import '../../imports/ui/body.js';


if(Meteor.isClient){
    Template.home.events({
        "submit #student-form": function() {
            Meteor.call("sendSMS");

            //pop up confirmation after submitting form
            swal("Success!", "You have been added to the WaitList", "success");

        }
})
};