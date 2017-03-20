import { Mongo } from 'meteor/mongo';

Students = new Mongo.Collection('students');

StudentSchema = new SimpleSchema({
    Name: {
        type: String,
        max: 50,
        label: 'Name *'
    },

    PhoneNumber: {
        type: String,
        max: 10,
        label: 'Phone Number *'
    },

    VipID: {
        type: String,
        max: 8,
        label: 'VIP ID *'
    },

    ReasonForVisit: {
        type: String,
        allowedValues: ["Change Major", "Add Major/Minor", "Other"],
        autoform: {
            afFieldInput: {
                firstOption: "(Select a Reason)"
            }
        },
        label: 'Reason for Visit *'
    },

    CurrentMajor: {
        type: String,
        max: 30,
        label: 'Current Major *'
    },

    IntendedMajor: {
        type: String,
        optional: true,
        max: 30,
        label: 'Intended Major'
    },

    Comments: {
        type: String,
        max: 300, 
        optional: true,
        label: 'Comments'
    },

    Disclaimer: {
        type: Boolean,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "boolean-checkbox",
            }
        },
        label: "Opt in for text service *Disclaimer"
    },
   
    createdAt: {
        type: Date,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue:function(){ 
            return new Date(); 
        }
    },
    rank: {
        type: Number,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue: function() {
            return 1;
        }
    },
    secondRank: {
        type: Number,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue: function() {
            return 1;
        }
    },
    active: {
        type: Boolean,
        autoform: {
            type: "hidden",
            label: false
        },
        autoValue: function() {
            return true;
        }
    }
});

Students.attachSchema(StudentSchema);

Students.allow({
    insert: function () {
        // the user must be logged in
        return (Meteor.user() != null);
    },
    update: function (userId) {
        // the user must be logged in
        return (Meteor.user() != null);
    },
    remove: function (userId) {
        // the user must be logged in
        return (Meteor.user() != null);
    }
});





