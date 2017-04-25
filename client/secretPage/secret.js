import '../../imports/ui/body.js';
import '../../imports/api/students';

Template.secret.onCreated (function() {
    this.subscribe("allStudents");
});

// check the wait time,if the user in the list, return the wait time, if the user not in the list 
// it should return "you are not in the list"   
 
Template.secret.helpers({
    waitTime: function() {
        var current = document.URL;
        console.log(current);
        /*Change this for uofsc... to 35 or 34*/
        current = current.substr(35);
        console.log(current);
                  
        //find the current phone number

         var phoneNum = Students.findOne({PhoneNumber:current});
        
       // if user has the number on the list, return the wait time.
   
         if(phoneNum != null && current != null){
            var time1 = Students.findOne({PhoneNumber:current}).waitTime;
            return time1 + " minutes";
        }
        else{
            return "You are not in the list";
        }
    }
});
