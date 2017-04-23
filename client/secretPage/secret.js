import '../../imports/ui/body.js';
import '../../imports/api/students';

Template.secret.helpers({
    secretTime: function() {
        Students.findOne({PhoneNumber: "1111111111"}).waitTime;
    }
});