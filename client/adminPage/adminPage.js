import '../../imports/api/students.js';

Template.adminPage.student = function() {
    return Students.find();
}

Template.buttonSelections.events({
    'click .glyphicon-trash'() {
        Students.remove(this._id);
    }
})
/*
Template.adminPage.events({
    'click .accordion-toggle'(event) {
        var span = $('.glyphicon');
        if(span.hasClass('glyphicon-plus')) 
            span.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        else
            span.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        //$(event.target).find('span').toggleClass('glyphicon-plus glyphicon-minus');
    }
})*/

Template.expandButton.events({
    'click #expandBtn'(event, temp) {
        temp.$('#expand').toggleClass('glyphicon-plus glyphicon-minus');
    }
})

Template.editModal.helpers({
  '#edit-form'() {
    return this._id;
  }
});