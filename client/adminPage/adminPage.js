import '../../imports/api/students.js';
import '../../imports/api/Archive';

var modalId_checkOut;
var modalId_delete;
//subscribes to collection to access data
Template.adminPage.onCreated(function (){
    Meteor.subscribe('allStudents');
    Meteor.subscribe('theArchive');
});

//gets every student in collection, this is used to populate the table in .html file
Template.adminPage.helpers({
    student: function(){
        return Students.find({}, {sort: {createdAt: 1}});
    },
    waitTimes: function(){
    return Students.findOne(this._id).waitTime +" minutes";
    }
});
//gives functionality to buttons on admin page
Template.buttonSelections.events({
    //Updates status on click of check-in button to In advisment
  'dblclick .check-in, dblclick .glyphicon-log-in' (event) {
      var status = Students.findOne(this._id).currentStatus;
      var checkTime = Students.findOne(this._id).waitTime;
      var studentName = Students.findOne(this._id).Name;
      if(status == "Waiting" && checkTime==0){
          var timestamp = Students.findOne(this._id).createdAt;
          Students.update(this._id, {$set: {currentStatus: "In Advisement"}});
          Meteor.call("updateWaitTime", timestamp);
          if(Students.find().count() > 3){
              var whoToContact = Students.findOne({waitTime: 45}).PhoneNumber;
              var receiveText = Students.findOne({PhoneNumber: whoToContact}).Disclaimer;
              if(receiveText == true){
                  Meteor.call("getToUAC", whoToContact);
              }
          }
      }
      if(status="Waiting" && checkTime != 0){
          var nextStudentWaiting = Students.findOne({waitTime:0},{currentStatus:"Waiting"}).Name;
          swal( studentName +" is not the next person in line","The next student currently waiting is "+nextStudentWaiting,"error");
      }
       //$(event.target).closest('.mainRow').css({"background-color":"#16B804","color":"white"});
   },
   //on click of move button it moves person to bottom of the list and updates all wait times in the list
   'dblclick .move'(){
       var status = Students.findOne(this._id).currentStatus;
       var studentsWaiting = Students.find({currentStatus: "Waiting"}).count();
       if(studentsWaiting > 3){
           var whoToContact = Students.findOne({waitTime: 45}).PhoneNumber;
       }
       if(status == "Waiting"){
           //var check = Students.findOne(this._id).PhoneNumber;
           var checkTime = Students.findOne(this._id).waitTime;
           var lastWait = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{waitTime:1, _id:0}}).waitTime;
           var timestamp1 = Students.findOne(this._id).createdAt;
           Students.update(this._id, {$set: {createdAt: new Date(), waitTime: lastWait}});
           var timestamp2 = Students.findOne(this._id).createdAt;
           //calls on server side code to update multiple people in the collection at one time
           Meteor.call("updateAfterMove", timestamp1, timestamp2);
           if(checkTime <45) {
               /*if(studentsWaiting ==4){
                   var receiveText = Students.findOne({PhoneNumber: whoToContact}).Disclaimer;
                   if(receiveText == true){
                       Meteor.call("getToUAC",whoToContact);
                   }
               }*/
               if (studentsWaiting > 3) {
                   //var whoToContact = Students.findOne({waitTime: 45}).PhoneNumber;
                   var receiveText = Students.findOne({PhoneNumber: whoToContact}).Disclaimer;
                   if (receiveText == true) {
                       Meteor.call("getToUAC", whoToContact);
                   }
               }
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
       else{
          swal("invalid operation", "You cannot move a student that is in advisement", "error");
       }
   },
   //updates wait times when student removed
   'dblclick .checkingOut'(){
       console.log(this._id);
       modalId_checkOut = this._id;
       console.log(modalId_checkOut);
       var status = Students.findOne(modalId_checkOut).currentStatus;
       if(status == "In Advisement") {
           Modal.show('checkOutModal', function () {
               return Students.findOne(this._id);
           });
       }
       else{
           swal("Invalid operation","Students cannot be checked out unless they've been checked in."+" If you wish to remove them, click the delete button.", "error");
       }
   },
   'dblclick .delete'(){
       console.log(this._id);
       modalId_delete = this._id;
       console.log(modalId_delete);
       Modal.show('deleteModal', function() {
           return Students.findOne(this._id);
       });
   }
});

Template.checkOutModal.events({
    'click .checkOut'(){
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
        Archive.insert({Name:archiveName,PhoneNumber:archiveNumber, USCID:archiveID, ReasonForVisit:archiveReason,CurrentMajor:archiveCurrMajor,IntendedMajor:archiveIntMajor,Comments:archiveComment,createdAt:archiveCreatedAt});
        Students.remove(modalId_checkOut);

    }
});

Template.deleteModal.events({
    'click .deleteStudent'(){
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
        Archive.insert({Name:archiveName,PhoneNumber:phone, USCID:archiveID, ReasonForVisit:archiveReason,CurrentMajor:archiveCurrMajor,IntendedMajor:archiveIntMajor,Comments:archiveComment,createdAt:timestamp});

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
       /* var date = new Date();
        var currentDateDay = date.getDate();
        var currentDateMonth = date.getMonth()+1;
        var earliestArchiveDateID = Archive.findOne({},{sort:{createdAt:1}, limit:1})._id;
        var earliestArchiveDate = Archive.findOne({},{sort:{createdAt:1}, limit:1}).createdAt;
        var earliestArchiveMonthDate = earliestArchiveDate.getMonth()+1;
        var earliestArchiveDayDate = earliestArchiveDate.getDate();
        if(Math.abs(earliestArchiveMonthDate - currentDateMonth)==6){
            Archive.remove(earliestArchiveDateID);
        }*/
        Students.remove(modalId_delete);
    }
});


