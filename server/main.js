import { Meteor } from 'meteor/meteor';
import '../imports/api/students.js';
import '../lib/router.js';
import '../imports/api/Archive';

Meteor.startup(() => {

});
Meteor.methods({

    //function for sending the initial Twilio sms message from the host to students phones
    sendSMS: function(phoneNumber, link){
        var authToken = 'f3d5c0559fed5389332c911ad930e600';
        var accountSid = 'ACd82dc2f26dfff254f2703a4719050567';
        twilio = Twilio(accountSid, authToken);
        twilio.sendSms({
            to: phoneNumber, // Any number Twilio can deliver to
            from: '+18034030499', // A number you bought from Twilio and can use for outbound communication
            body: 'You\'ve joined the waitlist. Reply "Remove" to be removed. Reply "Time" or visit ' +link+ ' to see your wait time', // body of the SMS message
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

    //function for sending an update once the student's wait time changes to 30 minutes
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

    //function for sending message to students if they were removed from the WaitList
    removedMessage: function(phoneNumber){
        var authToken = 'f3d5c0559fed5389332c911ad930e600';
        var accountSid = 'ACd82dc2f26dfff254f2703a4719050567';
        twilio = Twilio(accountSid, authToken);
        twilio.sendSms({
            to: phoneNumber, // Any number Twilio can deliver to
            from: '+18034030499', // A number you bought from Twilio and can use for outbound communication
            body: 'You have been removed from the wait list because you were not at the UAC in time for your appointment. You can sign up again if you wish.' // body of the SMS message
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

    //function for sending message to students if an admin clicked the delete button before student was advised
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

    //function that updates the student's current wait time that is stored in the database
    updateWaitTime: function(timestamp){
         Students.update({createdAt: { $gt: timestamp }}, {$inc: {waitTime: -15 }},{multi:true});
    },

    //function that updates the student's current wait time if they moved positions on the admin page
    updateAfterMove: function(timestamp1, timestamp2){
        Students.update({createdAt: { $gt: timestamp1, $lt: timestamp2 }}, {$inc: {waitTime: -15 }},{multi:true});
    },

    //function to download the archive .csv for administrators records
    download: function() {
        var collection = Archive.find().fetch();
        var heading = true; // Optional, defaults to true
        var delimiter = "," // Optional, defaults to ",";
        return exportcsv.exportToCSV(collection, heading, delimiter);
    }
});
