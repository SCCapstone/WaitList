import '../../imports/api/students.js';

var modalId_checkOut;
var modalId_delete;
//subscribes to collection to access data
Template.adminPage.onCreated(function (){
    Meteor.subscribe('allStudents');
});

//gets every student in collection, this is used to populate the table in .html file
Template.adminPage.student = function() {
    return Students.find({}, {sort: {createdAt: 1}});
};

//gives functionality to buttons on admin page
Template.buttonSelections.events({
    //Updates status on click of check-in button to In advisment
  'click .check-in, click .glyphicon-log-in' (event) {
      var status = Students.findOne(this._id).currentStatus;

      if(status == "Waiting"){
          var timestamp = Students.findOne(this._id).createdAt;
          console.log(timestamp);
          Students.update(this._id, {$set: {currentStatus: "In Advisement"}});
          Meteor.call("updateWaitTime", timestamp);
      }
       //$(event.target).closest('.mainRow').css({"background-color":"#16B804","color":"white"});
   },
   //Updates status back to waiting on double click, this is mainly for if check-in is accidently clicked
   /*'dblclick .check-in, dblclick .glyphicon-log-in' (event) {
       var status = Students.findOne(this._id).currentStatus;
       Students.update(this._id, {$set: {currentStatus: "Waiting"}});
       var timestamp = Students.findOne(this._id).createdAt;
       //Meteor.call("updateFix", timestamp, status);
       //$(event.target).closest('.mainRow').css({"background-color":"#FAFAFA","color":"black"});
   },*/
   //on click of move button it moves person to bottom of the list and updates all wait times in the list
   'click .move'(){
       var lastWait = Students.findOne({},{sort:{createdAt:-1},limit:1, fields:{waitTime:1, _id:0}}).waitTime;
       //console.log(lastWait);
       var timestamp1 = Students.findOne(this._id).createdAt;
       Students.update(this._id, {$set: {createdAt: new Date(), waitTime: lastWait}});
       var timestamp2 = Students.findOne(this._id).createdAt;
       //calls on server side code to update multiple people in the collection at one time
       Meteor.call("updateAfterMove", timestamp1, timestamp2);
   },
   //updates wait times when student removed
   'click .checkingOut'(){
       console.log(this._id);
       modalId_checkOut = this._id;
       console.log(modalId_checkOut);
       Modal.show('checkOutModal', function () {
           return Students.findOne(this._id);
	    });
   },
   'click .delete'(){
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
       console.log(modalId_checkOut);
       var timestamp = Students.findOne(modalId_checkOut).createdAt;
       var status = Students.findOne(modalId_checkOut).currentStatus;
        console.log(status);
        if(status == "Waiting"){
            Meteor.call("updateWaitTime", timestamp);
        }
       Students.remove(modalId_checkOut);
   }
});

Template.deleteModal.events({
    'click .deleteStudent'(){
        console.log(modalId_delete);
        var timestamp = Students.findOne(modalId_delete).createdAt;
        var status = Students.findOne(modalId_delete).currentStatus;
        console.log(status);
        if(status == "Waiting"){
            Meteor.call("updateWaitTime", timestamp);
        }
        Students.remove(modalId_delete);
    }
});

//allows rows on admin page in table to expand and collapse on press of +/- button, shows hidden row
Template.expandButton.events({
    'click #expandBtn'(event, temp) {
        temp.$('#expand').toggleClass('glyphicon-plus glyphicon-minus');
    }
});
