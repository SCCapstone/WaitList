import '../../imports/ui/body.js';
import '../../imports/api/students';

Template.secret.onCreated (function() {
    this.subscribe("allStudents");
});

Template.secret.helpers({
    waitTime: function() {
        var current = document.URL;
        console.log(current);
        /*Change this for uofsc... to 35 or 34*/
        current = current.substr(35);
        console.log(current);
        var phoneNum = Students.findOne({PhoneNumber:current});
        if(phoneNum != null && current != null){
            var time1 = Students.findOne({PhoneNumber:current}).waitTime;
            return time1 + " minutes";
        }
        else{
            return "You are not in the list";
        }
    }
});
