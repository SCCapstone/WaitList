import '../../imports/api/students.js';
import '../../imports/api/Archive';

var modalId_checkOut;
var modalId_delete;
//subscribes to collection to access data
Template.adminPage.onCreated(function (){
    Meteor.subscribe('allStudents');
    Meteor.subscribe('theArchive');
});

Template.adminPage.helpers({
    //gets every student in collection, this is used to populate the table on admin page
    student: function(){
        return Students.find({}, {sort: {createdAt: 1}});
    },
    //gets waitTimes of the current person
    waitTimes: function(){
    return Students.findOne(this._id).waitTime +" minutes";
    }
});
//gives functionality to buttons on admin page
Template.buttonSelections.events({
    //Updates status on double click of check-in button to In advisment
    'dblclick .check-in, dblclick .glyphicon-log-in' (event) {
        //gets status, waitTime and Name of current person
        var status = Students.findOne(this._id).currentStatus;
        var checkTime = Students.findOne(this._id).waitTime;
        var studentName = Students.findOne(this._id).Name;
        //checks if person is waiting and the first person
        if(status == "Waiting" && checkTime==0){
            //saves timestamp and updates status of current student, also calls on meteor method to update wait times
            var timestamp = Students.findOne(this._id).createdAt;
            Students.update(this._id, {$set: {currentStatus: "In Advisement"}});
            Meteor.call("updateWaitTime", timestamp);
            //if the count is more than 3 it determines who gets the text for 30 minute reminder and then sends text.
            if(Students.find().count() > 3){
                var whoToContact = Students.findOne({waitTime: 45}).PhoneNumber;
                var receiveText = Students.findOne({PhoneNumber: whoToContact}).Disclaimer;
            if(receiveText == true){
                Meteor.call("getToUAC", whoToContact);
            }
        }
      }
      //If the next person in line, it puts out alert to say who the next person who should be checked in is
      if(status="Waiting" && checkTime != 0){
          var nextStudentWaiting = Students.findOne({waitTime:0},{currentStatus:"Waiting"}).Name;
          swal( studentName +" is not the next person in line","The next student currently waiting is "+nextStudentWaiting,"error");
      }
   },
   //on double click of move button it moves person to bottom of the list and updates all wait times in the list
   'dblclick .move'(){
       //gets status and count of students who are waiting
       var status = Students.findOne(this._id).currentStatus;
       var studentsWaiting = Students.find({currentStatus: "Waiting"}).count();
       //determines who to contact for 30 minute reminder
       if(studentsWaiting > 3){
           var whoToContact = Students.findOne({waitTime: 45}).PhoneNumber;
       }
       if(status == "Waiting"){
           //gets waitimes of current person and last person in list
           var checkTime = Students.findOne(this._id).waitTime;
           var lastWait = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{waitTime:1, _id:0}}).waitTime;
           var timestamp1 = Students.findOne(this._id).createdAt;
           //updates wait times
           Students.update(this._id, {$set: {createdAt: new Date(), waitTime: lastWait}});
           var timestamp2 = Students.findOne(this._id).createdAt;
           //calls on server side code to update multiple people in the collection at one time
           Meteor.call("updateAfterMove", timestamp1, timestamp2);
           
           if(checkTime <45) {
               if (studentsWaiting > 3) {
                   //sends text if person has opted in
                   var receiveText = Students.findOne({PhoneNumber: whoToContact}).Disclaimer;
                   if (receiveText == true) {
                       Meteor.call("getToUAC", whoToContact);
                   }
               }
               //determines who gets text if only 3 people in the list
               if (studentsWaiting == 3 && checkTime != 30) {
                   var lastPerson = Students.findOne({}, {sort: {createdAt: -1}, limit: 1}).Name;
                   var contact = Students.findOne({Name: lastPerson}).PhoneNumber;
                   var receiveText = Students.findOne({PhoneNumber: contact}).Disclaimer;
                   if (receiveText == true) {
                       Meteor.call("getToUAC", contact);
                   }
               }
           }
       }
       //gives error message if move is attempted on person who is in advisement
       else{
          swal("invalid operation", "You cannot move a student that is in advisement", "error");
       }
   },
   //updates wait times when student removed
   'dblclick .checkingOut'(){
       //gets id of current person
       modalId_checkOut = this._id;
       var status = Students.findOne(modalId_checkOut).currentStatus;
       //if person is checked in open up modal
       if(status == "In Advisement") {
           Modal.show('checkOutModal', function () {
               return Students.findOne(this._id);
           });
       }
       //error message if attempt is made to check-out person who has not been checked in
       else{
           swal("Invalid operation","Students cannot be checked out unless they've been checked in."+" If you wish to remove them, click the delete button.", "error");
       }
   },
   //updates wait times after removal 
   'dblclick .delete'(){
       //saves current persons id and shows modal
       modalId_delete = this._id;
       Modal.show('deleteModal', function() {
           return Students.findOne(this._id);
       });
   }
});

Template.checkOutModal.events({
    'click .checkOut'(){
        //saves data to be archived
        var archiveName = Students.findOne(modalId_checkOut).Name;
        var archiveNumber = Students.findOne(modalId_checkOut).PhoneNumber;
        var archiveID = Students.findOne(modalId_checkOut).USCID;
        var archiveReason = Students.findOne(modalId_checkOut).ReasonForVisit;
        var archiveCurrMajor = Students.findOne(modalId_checkOut).CurrentMajor;
        if(Students.findOne(modalId_checkOut).IntendedMajor) {
            var archiveIntMajor = Students.findOne(modalId_checkOut).IntendedMajor;
        }
        else{
            var archiveIntMajor = "N/A";
        }
        if(Students.findOne(modalId_checkOut).Comments) {
            var archiveComment = Students.findOne(modalId_checkOut).Comments;
            archiveComment = archiveComment.replace(/,/g," ");
            archiveComment = archiveComment.replace(/'/g,"");
        }
        else{
            var archiveComment = "N/A";
        }
        var archiveCreatedAt = Students.findOne(modalId_checkOut).createdAt;
        //inserts data in archive
        Archive.insert({Name:archiveName,PhoneNumber:archiveNumber, USCID:archiveID, ReasonForVisit:archiveReason,CurrentMajor:archiveCurrMajor,IntendedMajor:archiveIntMajor,Comments:archiveComment,createdAt:archiveCreatedAt});
        //removes the current student
        Students.remove(modalId_checkOut);

    }
});

Template.deleteModal.events({
    'click .deleteStudent'(){
        //saves data to be archived
        var timestamp = Students.findOne(modalId_delete).createdAt;
        var status = Students.findOne(modalId_delete).currentStatus;
        var phone = Students.findOne(modalId_delete).PhoneNumber;
        var waitTime = Students.findOne(modalId_delete).waitTime;
        var canGetText = Students.findOne(modalId_delete).Disclaimer;
        var studentsWaiting = Students.find({currentStatus: "Waiting"}).count();

        var archiveName = Students.findOne(modalId_delete).Name;
        var archiveID = Students.findOne(modalId_delete).USCID;
        var archiveReason = Students.findOne(modalId_delete).ReasonForVisit;
        var archiveCurrMajor = Students.findOne(modalId_delete).CurrentMajor;
        if(Students.findOne(modalId_delete).IntendedMajor) {
            var archiveIntMajor = Students.findOne(modalId_delete).IntendedMajor;
        }
        else{
            var archiveIntMajor = "N/A";
        }
        if(Students.findOne(modalId_delete).Comments) {
            var archiveComment = Students.findOne(modalId_delete).Comments;
            archiveComment = archiveComment.replace(/,/g," ");
            archiveComment = archiveComment.replace(/'/g,"");
        }
        else{
            var archiveComment = "N/A";
        }
        //inserts data into archive
        Archive.insert({Name:archiveName,PhoneNumber:phone, USCID:archiveID, ReasonForVisit:archiveReason,CurrentMajor:archiveCurrMajor,IntendedMajor:archiveIntMajor,Comments:archiveComment,createdAt:timestamp});

        //updates wait times and determines who to contact and what message to send
        if(status == "Waiting"){
            Meteor.call("updateWaitTime", timestamp);
            if(studentsWaiting > 3){
                var whoToContact = Students.findOne({waitTime: 45}).PhoneNumber;
                var receiveText = Students.findOne({PhoneNumber: whoToContact}).Disclaimer;
                if(receiveText == true){
                    Meteor.call("getToUAC", whoToContact);
                }
            }
            if(canGetText == true){
                if(waitTime == 0){
                    Meteor.call("removedMessage", phone);
                }else{
                    Meteor.call("accidentalRemoval", phone)
                }            
            }
        }
        //removes the student from collection
        Students.remove(modalId_delete);
    }
});


