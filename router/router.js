if(Meteor.isClient) {
  Router.route('/', function () {
    this.render('home');
  }),

      Router.route('/login', function () {
        this.render('login');
      }),

      Router.route('/adminPage', function () {
        this.render('adminPage');
      });


}
