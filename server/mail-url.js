


Meteor.startup(function () {
    //Setup the email environment variable
    // Right now its using the pmba gmail account
  


 // process.env.MAIL_URL="smtp://pmba.sc.capstone%40gmail.com:pmbaPMBA@smtp.gmail.com:465/";

process.env.MAIL_URL = "smtp://testing2017usc@gmail.com:asdfasdf123@smtp.gmail.com:587";

    Accounts.emailTemplates.siteName = "Wait list";
    Accounts.emailTemplates.from = "wait list ADMIN <test2017usc@gmail.com>";


    //Send email when account is created
    Accounts.config({
        sendVerificationEmail: true
    });
});





//process.env.MAIL_URL = "smtp://testing2017usc@gmail.com:asdfasdf123@smtp.gmail.com:587";
