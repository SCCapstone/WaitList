//creates default admin user account, if no account exists
Meteor.startup(function(){
    console.log('ON STARTUP CREATE ADMIN USER');
    if( Meteor.users.find().count() == 0){
        console.log('IF admin NOT FOUND CREATE ADMIN USER');
        Accounts.createUser({
            email: 'admin@email.com',
            password: 'asdfasdf'
        });
    }
});