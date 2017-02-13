Router.onBeforeAction(function () {
    if(!Meteor.userId()){
        this.render('home');
    }else{
        this.render('adminPage');
    }
});

Router.route('/', function(){

        this.render("home");

    }
);