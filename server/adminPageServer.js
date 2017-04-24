Meteor.publish('allStudents',function(){
    return Students.find();
});
Meteor.publish('theArchive',function(){
   return Archive.find();
});
