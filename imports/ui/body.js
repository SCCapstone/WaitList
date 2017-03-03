import { Template } from 'meteor/templating';
import { students } from '../api/students.js';
import './body.html';

Accounts.config({
    forbidClientAccountCreation : false
});

Accounts.createUser({
        email: 'admin@email.com',
        password: 'asdfasdf',
});
