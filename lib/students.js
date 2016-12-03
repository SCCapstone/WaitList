/**
import { Mongo } from 'meteor/mongo';

Students = new Mongo.Collection('Students');

Students.allow({
    insert: function(userId, doc) {
        return !!userId;
    }
});

studentSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    number: {
        type: String,
        label: "Number"
    },
    vipID: {
        type: String,
        label: "ID"
    },
    status: {
        type: String,
        label: "CurrentStatus"
    }
})
*/