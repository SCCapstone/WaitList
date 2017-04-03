import '../../imports/ui/body.js';
import '../../imports/api/students.js';

Template.home.onCreated(function() {//This is not needed,only for testing purposes to access databse from sign-in page
    Meteor.subscribe("allStudents");
});

StudentSchema = new SimpleSchema({
    PhoneNumber: {
        type: String,
        regEx: /^[0-9999999999]{10}$/,
        min: 10,
        max: 10,
        label: 'Phone Number *',
        autoform:
            {
                placeholder: "example: 8031234567"
            },
        /*custom: function(){
         var phoneNumber = this.siblingField("PhoneNumber").value;
         Meteor.call("isValidPhoneNumber",phoneNumber);
         }*/
    }
});