import { Meteor } from 'meteor/meteor';
import '../imports/api/students.js';

Meteor.startup(() => {

});

Meteor.methods({
    sendSMS: function (phoneNumber) {
        var authToken = '0a6a6ac11217bdb596caee261ecff997';
        var accountSid = 'AC85d608588fd51f68a2d519e1f1ce2dc0';
        twilio = Twilio(accountSid, authToken);
        twilio.sendSms({
            to: phoneNumber, // Any number Twilio can deliver to
            from: '+18038280124', // A number you bought from Twilio and can use for outbound communication
            body: 'You have been added to the waitlist' // body of the SMS message
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
    isValidPhoneNumber: function(phoneNumber) {
        if(! /^[0-9]+$/.test(phoneNumber))
        {
            console.log("THis is wrong");
        }
        else
        {
            console.log("Atta' babe!");
        }
    }
});
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.post('/server/SMS.xml', function (req, res){
    console.log(req.body);
    var msgFrom = req.body.From;
    var msgBody = req.body.Body;

    res.send(`
<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Message>
        Hello ${msgFrom}. You said: ${msgBody}
        </Message>
      </Response>`);
});

app.listen(1337);