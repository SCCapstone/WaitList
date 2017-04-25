//sets up the publish and subscription features for allowing access to the MongoDB on different files
Meteor.publish('allStudents',function(){
    return Students.find();
});
Meteor.publish('theArchive',function(){
   return Archive.find();
});
