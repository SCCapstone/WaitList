<<<<<<< HEAD
import '../../imports/AdminUI/admin.js';



Template.listName.student_name = function () {
    return Students.find();
}

Template.listNumber.student_number = function () {
    return Students.find();
}

Template.listVIP.student_ID = function () {
    return Students.find();
}

Template.listReason.student_Reason = function () {
    return Students.find();
}

Template.listCurrent.student_Current = function () {
    return Students.find();
}

Template.listIntended.student_Intended = function () {
    return Students.find();
}

Template.listComments.student_Comments = function () {
    return Students.find();
}

Template.listDisclaimer.student_Disclaimer = function () {
    return Students.find();
}

Template.listDisclaimer.events({
    'click .glyphicon'() {
        Students.remove(this._id);
=======
import '../../imports/api/students.js';

Template.adminPage.onCreated(function (){
    Meteor.subscribe('allStudents');
});

Template.adminPage.student = function() {
    return Students.find({}, {sort: {rank: 1, secondRank: 1}});
};

Template.buttonSelections.events({
  'dblclick .check-in, dblclick .glyphicon-log-in' (event) {
       $(event.target).closest('.mainRow').css({"background-color":"#16B804","color":"white"});
   },
   'click .check-in, dblclick .glyphicon-log-in' (e) {
       $(event.target).closest('.mainRow').css({"background-color":"#FAFAFA","color":"black"});
   },
   'click .move'(){
       Students.update(this._id, {$inc: {rank: 1}});
   }
});

Template.expandButton.events({
    'click #expandBtn'(event, temp) {
        temp.$('#expand').toggleClass('glyphicon-plus glyphicon-minus');
>>>>>>> origin/master
    }
});
