var require = meteorInstall({"lib":{"router.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// lib/router.js                                                                               //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
Router.onBeforeAction(function () {                                                            // 1
    if (!Meteor.userId()) {                                                                    // 2
        this.render('home');                                                                   // 3
    } else {                                                                                   // 4
        this.render('adminPage');                                                              // 5
    }                                                                                          // 6
});                                                                                            // 7
Router.route('/', function () {                                                                // 9
    this.render("home");                                                                       // 11
});                                                                                            // 13
/////////////////////////////////////////////////////////////////////////////////////////////////

}},"imports":{"api":{"students.js":["meteor/mongo",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// imports/api/students.js                                                                     //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var Mongo = void 0;                                                                            // 1
module.import('meteor/mongo', {                                                                // 1
    "Mongo": function (v) {                                                                    // 1
        Mongo = v;                                                                             // 1
    }                                                                                          // 1
}, 0);                                                                                         // 1
Students = new Mongo.Collection('students');                                                   // 5
StudentSchema = new SimpleSchema({                                                             // 7
    Name: {                                                                                    // 8
        type: String,                                                                          // 9
        max: 50                                                                                // 10
    },                                                                                         // 8
    PhoneNumber: {                                                                             // 13
        type: String,                                                                          // 14
        max: 10                                                                                // 15
    },                                                                                         // 13
    VipID: {                                                                                   // 19
        type: String,                                                                          // 20
        max: 8                                                                                 // 21
    },                                                                                         // 19
    ReasonForVisit: {                                                                          // 24
        type: String,                                                                          // 25
        allowedValues: ["Change Major", "Add Major/Minor", "Other"],                           // 26
        autoform: {                                                                            // 27
            afFieldInput: {                                                                    // 28
                firstOption: "(Select a Reason)"                                               // 29
            }                                                                                  // 28
        }                                                                                      // 27
    },                                                                                         // 24
    CurrentMajor: {                                                                            // 34
        type: String,                                                                          // 35
        max: 30                                                                                // 36
    },                                                                                         // 34
    IntendedMajor: {                                                                           // 39
        type: String,                                                                          // 40
        max: 30                                                                                // 41
    },                                                                                         // 39
    Comments: {                                                                                // 44
        type: String,                                                                          // 45
        max: 300,                                                                              // 46
        optional: true                                                                         // 47
    },                                                                                         // 44
    Disclaimer: {                                                                              // 50
        type: Boolean,                                                                         // 51
        optional: true,                                                                        // 52
        autoform: {                                                                            // 53
            afFieldInput: {                                                                    // 54
                type: "boolean-checkbox"                                                       // 55
            }                                                                                  // 54
        },                                                                                     // 53
        label: "Opt in for text service"                                                       // 58
    },                                                                                         // 50
    createdAt: {                                                                               // 60
        type: Date,                                                                            // 61
        autoform: {                                                                            // 62
            type: "hidden",                                                                    // 63
            label: false                                                                       // 64
        },                                                                                     // 62
        autoValue: function () {                                                               // 66
            return new Date();                                                                 // 67
        }                                                                                      // 68
    }                                                                                          // 60
});                                                                                            // 7
Students.attachSchema(StudentSchema);                                                          // 72
/////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"server":{"main.js":["meteor/meteor","../imports/api/students.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// server/main.js                                                                              //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
var Meteor = void 0;                                                                           // 1
module.import('meteor/meteor', {                                                               // 1
    "Meteor": function (v) {                                                                   // 1
        Meteor = v;                                                                            // 1
    }                                                                                          // 1
}, 0);                                                                                         // 1
module.import('../imports/api/students.js');                                                   // 1
Meteor.startup(function () {});                                                                // 4
Meteor.methods({                                                                               // 8
    sendSMS: function () {                                                                     // 9
        var authToken = '0a6a6ac11217bdb596caee261ecff997';                                    // 10
        var accountSid = 'AC85d608588fd51f68a2d519e1f1ce2dc0';                                 // 11
        twilio = Twilio(accountSid, authToken);                                                // 12
        twilio.sendSms({                                                                       // 13
            to: '+18645172771',                                                                // 14
            // Any number Twilio can deliver to                                                // 14
            from: '+18038280124',                                                              // 15
            // A number you bought from Twilio and can use for outbound communication          // 15
            body: 'You have been added to the waitlist' // body of the SMS message             // 16
                                                                                               //
        }, function (err, responseData) {                                                      // 13
            //this function is executed when a response is received from Twilio                // 17
            if (!err) {                                                                        // 18
                // "err" is an error received during the request, if any                       // 18
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1                   // 21
                console.log(responseData.from); // outputs "+14506667788"                      // 22
                                                                                               //
                console.log(responseData.body); // outputs "word to your mother."              // 23
            }                                                                                  // 24
        });                                                                                    // 25
    }                                                                                          // 26
});                                                                                            // 8
/////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./lib/router.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
