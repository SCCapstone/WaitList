if(Meteor.isClient) {
  Router.route('/', function() {
    this.render('home');
  }),
  
  Router.route('/adminPage', function() {
    this.render('adminPage');
  });

}

