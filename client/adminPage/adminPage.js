import '../../imports/api/students.js';

Meteor.publish('allStudents',function(){
    return Students.find();
});

Template.adminPage.student = function() {
    return Students.find();
}

Template.buttonSelections.events({
  'dblclick .check-in, dblclick .glyphicon-log-in' (e) {
        $(e.target).closest('.selectionChange').css({"background-color":"#16B804","color":"white"});
   },
   'click .check-in, click .glyphicon-log-in' (e) {
        $(e.target).closest('.selectionChange').css({"background-color":"#FAFAFA","color":"black"});
   },
   'click .btn-danger, click .glyphicon-trash'() {
       var deleteChoice = Session.set(deleteChoice, Students.find(this._id));
       return deleteChoice;
   }
})

Template.expandButton.events({
    'click #expandBtn'(event, temp) {
        temp.$('#expand').toggleClass('glyphicon-plus glyphicon-minus');
    }
})
