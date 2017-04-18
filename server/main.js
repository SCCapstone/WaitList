import { Meteor } from 'meteor/meteor';
import '../imports/api/students.js';
import '../lib/router.js';

Meteor.startup(() => {

});
Meteor.methods({
    sendSMS: function (phoneNumber) {
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
    /*replySMS: function(from){

    }*/
});
/*
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.post('/sms', function (req, res){
    console.log(req.body);
    var msgFrom = req.body.From;
    var msgBody = req.body.Body;






    //var waitTime = Students.findOne({},{limit:1, fields:{PhoneNumber: phone}}).waitTime;     
    //console.log(waitTime);
    if(msgBody == "Remove") {
        res.send(`<?xml version="1.0" encoding="UTF-8"?>
            <Response>
                <Message>
                    Hello ${msgFrom}. You said: ${msgBody}. You will now be removed from the waitlist.
                </Message>
            </Response>`);
    }
    else if(msgBody == "Time") {
        var waitTime = Students.findOne({PhoneNumber: msgFrom}).waitTime;
        res.send(`<?xml version="1.0" encoding="UTF-8"?>
            <Response>
                <Message>
                    Your current wait time is: ${waitTime} minutes.
                </Message>
            </Response>`);
    }
    else {
        res.send(`<?xml version="1.0" encoding="UTF-8"?>
            <Response>
                <Message>
                    Default
                </Message>
            </Response>`);
    }
});

app.listen(process.env.PORT, '0.0.0.0', function(err){
    console.log("Started listening on %s",app.url);
});*/
/*var http = require('http');
var express = require('express');
var twilio = require('twilio');

var app = express();

app.post('/server/sms.xml', function(req, res) {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
    twiml.message('The Robots are coming! Head for the hills!');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

http.createServer(app).listen(1337, function () {
    console.log("Express server listening on port 1337");
});*/