


Meteor.startup(function () {
  
// Setup the email Environment variable so user can receive email for 
// reset password.

process.env.MAIL_URL = "smtp://testing2017usc@gmail.com:asdfasdf123@smtp.gmail.com:587";

    Accounts.emailTemplates.siteName = "Wait list";
    Accounts.emailTemplates.from = "USC Wait List ADMIN <test2017usc@gmail.com>";


    //Send email when user created a account
    Accounts.config({
        sendVerificationEmail: true
    });
});





