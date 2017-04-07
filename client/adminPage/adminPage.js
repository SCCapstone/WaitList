import '../../imports/api/students.js';

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
       Students.update(this._id, {$set: {currentStatus: "In Advisement"}});
       //$(event.target).closest('.mainRow').css({"background-color":"#16B804","color":"white"});
   },
   //Updatews status back to waiting on double click, this is mainly for if check-in is accidently clicked
   'dblclick .check-in, dblclick .glyphicon-log-in' (event) {
       Students.update(this._id, {$set: {currentStatus: "Waiting"}});
       //$(event.target).closest('.mainRow').css({"background-color":"#FAFAFA","color":"black"});
   },
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
   'click .check-out'() {
       console.log("hello");
       //var timeStamp = Students.findOne(this._id).waitTime;
       //console.log(timeStamp);
       //calls on server side code to update multiple people in the collection at one time
       var temp = Meteor.call("checkOut");
       console.log(temp);
       console.log("hey");
   },
   
});

//allows rows on admin page in table to expand and collapse on press of +/- button, shows hidden row
Template.expandButton.events({
    'click #expandBtn'(event, temp) {
        temp.$('#expand').toggleClass('glyphicon-plus glyphicon-minus');
    }
});
