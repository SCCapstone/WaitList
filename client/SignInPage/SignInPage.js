import '../../imports/ui/body.js';

if(Meteor.isClient){
    Template.home.events({
        "submit #student-form": function(){
            Meteor.call("sendSMS");
        }
    })
}