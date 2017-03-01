import '../../imports/api/students.js';

Template.adminPage.onCreated(function (){
    Meteor.subscribe('allStudents');
});

Template.adminPage.student = function() {
    return Students.find({}, {sort: {rank: 1, secondRank: 1}});
}

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
})

Template.expandButton.events({
    'click #expandBtn'(event, temp) {
        temp.$('#expand').toggleClass('glyphicon-plus glyphicon-minus');
    }
})
