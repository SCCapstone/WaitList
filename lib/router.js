Router.onBeforeAction(function () {
    if(Meteor.userId()){
        this.render('adminPage');
    }
    else {
        this.render('home');
    }
});

Router.route('/', function() {
    this.render("home");
});


// below is routing set-up to allow for a third page, but doesn't allow admins to view home page if logged in
// Router.route('/', function() {
//     if(!Meteor.userId()) this.render('home');
//     else this.render('adminPage');
// });
//
// Router.route('/admin', function() {
//     if(!Meteor.userId()) this.render('home');
//     else this.render('adminPage');
//
// });
//
// Router.route('/CheckStatus', function() {
//     this.render('CheckStatus');
//
// });

//below is routing set-up for admins to log in then have to navigate to the /admin page
// Router.route('/', function() {
//     this.render('home');
// });
//
// Router.route('/admin', function() {
//     this.render('adminPage');
// });
//
// Router.route('/CheckStatus', function() {
//     this.render('CheckStatus');
//
// });