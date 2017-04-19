import '../../imports/ui/body.js';
import '../../imports/api/students';

function calcWaitTime(){
    var totalCount = Students.find().count();
    var hour = totalCount / 4;
    if (totalCount == 0) {
        //return 5 + " minutes";
        document.getElementById("insert").innerHTML ="Approximate Wait Time: "+ 5 + " minutes";
    } else if (totalCount < 4) {
        console.log("We here");
        //return 15 * totalCount + " minutes"
        document.getElementById("insert").innerHTML ="Approximate Wait Time: "+ 15 * totalCount + " minutes";
    } else if (totalCount >= 4 && totalCount % 4 == 0) {
        //return hour + " hour(s)";
        document.getElementById("insert").innerHTML ="Approximate Wait Time: "+ hour + " hour(s)";
    } else if (totalCount >= 4 && totalCount % 4 == 1) {
        hour = hour - .25;
        //return hour + " hour(s)" + " 15 minutes";
        document.getElementById("insert").innerHTML ="Approximate Wait Time: "+ hour + " hour(s)" + " 15 minutes";
    } else if (totalCount >= 4 && totalCount % 4 == 2) {
        hour = hour - .5;
        //return hour + " hour(s)" + " 30 minutes";
        document.getElementById("insert").innerHTML ="Approximate Wait Time: "+ hour + " hour(s)" + " 30 minutes";
    } else if (totalCount >= 4 && totalCount % 4 == 3) {
        hour = hour - .75;
        //return hour + " hour(s)" + " 45 minutes";
        document.getElementById("insert").innerHTML ="Approximate Wait Time: "+ hour + " hour(s)" + " 45 minutes";
    }
}

Template.home.onCreated(function() {//This is not needed,only for testing purposes to access database from sign-in page
    Meteor.subscribe("allStudents");
});

//Used to show approximate wait time on sign in page
Template.home.helpers({
    waitTime: function() {
        return calcWaitTime();
        /*var totalCount = Students.find().count();
        var hour = totalCount/4;

        if(totalCount < 4){
            return 15*totalCount + " minutes"
        }else if(totalCount >= 4 && totalCount%4 == 0){
            return hour + " hour(s)";
        }else if(totalCount >= 4 && totalCount%4 == 1){
            hour = hour - .25;
            return hour + " hour(s)" + " 15 minutes";
        }else if(totalCount >= 4 && totalCount%4 == 2){
            hour = hour - .5;
            return hour + " hour(s)" + " 30 minutes";
        }else if(totalCount >= 4 && totalCount%4 == 3){
            hour = hour - .75;
            return hour + " hour(s)" + " 45 minutes";
        }*/
    }
});

//Hook to make sure text is only sent on success of form submission, also gives popup 
//telling user that form was submitted succesfully
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
