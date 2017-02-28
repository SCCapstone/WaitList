Meteor.publish('allStudents',function(){
    return Students.find();
});
