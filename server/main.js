import { Meteor } from 'meteor/meteor';
import '../imports/api/students.js';

Meteor.startup(() => {

});
Meteor.methods({
    sendSMS: function () {
        var authToken = 'd9eb55747bee1edfe1fbf436cf665d04 ';
        var accountSid = 'ACb448607800d33568a3b708afea9614e2';
        twilio = Twilio(accountSid, authToken);
        twilio.sendSms({
            to: '+18431111111', // Any number Twilio can deliver to
            from: '+18032239994', // A number you bought from Twilio and can use for outbound communication
            body: 'Youve been added to the waitlist' // body of the SMS message
        }, function (err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) { // "err" is an error received during the request, if any
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
            }
        });
    }
});