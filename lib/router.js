Router.onBeforeAction(function () {
    if(!Meteor.userId()){
        this.render('home');
    }
    if(Meteor.userId()){
        this.render('adminPage');
    }
});

Router.route('/', function(){
        this.render("home");
    }
);
