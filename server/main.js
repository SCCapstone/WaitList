import { Meteor } from 'meteor/meteor';
import '../imports/api/students.js';
import '../lib/router.js';

Meteor.startup(() => {

});
Meteor.methods({
    sendSMS: function(phoneNumber){
        var authToken = 'f3d5c0559fed5389332c911ad930e600';
        var accountSid = 'ACd82dc2f26dfff254f2703a4719050567';
        twilio = Twilio(accountSid, authToken);
        twilio.sendSms({
            to: phoneNumber, // Any number Twilio can deliver to
            from: '+18034030499', // A number you bought from Twilio and can use for outbound communication
            body: 'You have been added to the waitlist. Reply "Remove" to be removed or reply "Time" to see you current estimated wait time.' // body of the SMS message
        }, function (err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) { // "err" is an error received during the request, if any
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
            }
        });
    },
    getToUAC: function(phoneNumber){
        var authToken = 'f3d5c0559fed5389332c911ad930e600';
        var accountSid = 'ACd82dc2f26dfff254f2703a4719050567';
        twilio = Twilio(accountSid, authToken);
        twilio.sendSms({
            to: phoneNumber, // Any number Twilio can deliver to
            from: '+18034030499', // A number you bought from Twilio and can use for outbound communication
            body: 'Your appointment is in approximately 30 minutes. If you are not at the UAC by your appointment you will be removed from our wait list.' // body of the SMS message
        }, function (err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) { // "err" is an error received during the request, if any
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
            }
        });
    },
    removedMessage: function(phoneNumber){
        var authToken = 'f3d5c0559fed5389332c911ad930e600';
        var accountSid = 'ACd82dc2f26dfff254f2703a4719050567';
        twilio = Twilio(accountSid, authToken);
        twilio.sendSms({
            to: phoneNumber, // Any number Twilio can deliver to
            from: '+18034030499', // A number you bought from Twilio and can use for outbound communication
            body: 'Your have been removed from the wait list because you were not at the UAC in time for your appointment. You can sign up again if you wish.' // body of the SMS message
        }, function (err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) { // "err" is an error received during the request, if any
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
            }
        });
    },
    accidentalRemoval: function(phoneNumber){
        var authToken = 'f3d5c0559fed5389332c911ad930e600';
        var accountSid = 'ACd82dc2f26dfff254f2703a4719050567';
        twilio = Twilio(accountSid, authToken);
        twilio.sendSms({
            to: phoneNumber, // Any number Twilio can deliver to
            from: '+18034030499', // A number you bought from Twilio and can use for outbound communication
            body: 'You have been removed from our wait list. If you did not request this removal please contact the UAC.' // body of the SMS message
        }, function (err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) { // "err" is an error received during the request, if any
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
            }
        });
    },
    updateWaitTime: function(timestamp){
         Students.update({createdAt: { $gt: timestamp }}, {$inc: {waitTime: -15 }},{multi:true});
    },
    updateAfterMove: function(timestamp1, timestamp2){
        Students.update({createdAt: { $gt: timestamp1, $lt: timestamp2 }}, {$inc: {waitTime: -15 }},{multi:true});
    },
    validate: function(){
        if(Meteor.userId())
        {
            return true;
        }
        else{
            return false;
        }
    }
});
