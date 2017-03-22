Router.route('/', function() {
    this.render('home');

    if(!Meteor.userId()) this.render('home');
    else this.render('adminPage');
});

Router.route('/admin', function() {
    if(!Meteor.userId()) this.render('home');
    else this.render('adminPage');

});

Router.route('/CheckStatus', function() {
     this.render('CheckStatus');

});