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

Router.route('/server/sms.xml', {
  where: 'server',
  action: function() {

    var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
        "<Response>" +
            "<Message>OMG ITS WORKING</Message>" +
        "</Response>";

    this.response.writeHead(200, {'Content-Type': 'application/xml'});
    this.response.end(xmlData);
  }
});
