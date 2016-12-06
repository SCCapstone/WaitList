import { Mongo } from 'meteor/mongo';



Students = new Mongo.Collection('students');

StudentSchema = new SimpleSchema({
    Name: {
        type: String,
        max: 200
    },

    PhoneNumber: {
        type: String,
        max: 20

    },

    VipID: {
        type: String,
        max: 8
    },

    ReasonForVisit: {
        type: String,
        allowedValues: ["Change Major", "Add Major/Minor", "Other"],
        autoform: {
            afFieldInput: {
                firstOption: "(Select a Reason)"
            }
        }
    },

    CurrentMajor: {
        type: String,
        max: 30
    },

    IntendedMajor: {
        type: String,
        max: 30
    },

    Comments: {
        type: String,
        max: 300
    },

    Disclaimer: {
        type: Boolean,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "boolean-checkbox",
            }
        },
        label: "Opt in for text service"
    }
});

Students.attachSchema(StudentSchema);





