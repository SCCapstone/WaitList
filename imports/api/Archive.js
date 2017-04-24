import { Mongo } from 'meteor/mongo';

Archive = new Mongo.Collection('archive');

//All below is schema for Mongodb, Collection Students
ArchiveSchema = new SimpleSchema({
    Name: {
        type: String,
        label: 'Name *'
    },

    PhoneNumber: {
        type: String,
        label: 'Phone Number *',
    },

    USCID: {
        type: String,
        label: 'USC ID *',
    },

    ReasonForVisit: {
        type: String,
        label: 'Reason for Visit *'
    },

    CurrentMajor: {
        type: String,
        label: 'Current Major *',
    },

    IntendedMajor: {
        type: String,
        optional: true,
        label: 'Intended Major/Minor',
    },

    Comments: {
        type: String,
        optional: true,
        label: 'Comments',
    },

    createdAt: {
        type: Date,

    },
});
Archive.attachSchema(ArchiveSchema);

