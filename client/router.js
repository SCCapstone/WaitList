if(Meteor.isClient) {
  Router.route('/', function() {
    this.render('home');
  }),

  Router.route('/test', function() {
    this.render('test');
  });
}
