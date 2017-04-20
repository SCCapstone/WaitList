if(Meteor.isClient) {
    Router.onBeforeAction(function () {
        if (Meteor.userId()) {
            this.render('adminPage');
        }
        else {
            this.next();
        }
    });
}

Router.route('/', function() {
    this.render("home");
});

Router.route('/:_id', function () {
  var params = this.params; // { _id: "5" }
  var id = params._id; // "5"
  this.render('secret.html');
});

Router.route('/server/sms.xml', {where:"server"})
    .post(function(req,res){
        var rawIn = req.body;
        //this.response.end(rawIn);
        console.log(rawIn);
        var twilio = require('twilio');
        var twiml = new twilio.TwimlResponse();
        var msgFrom = req.body.From;
        var msgBody = req.body.Body;
        if(msgBody == "Remove") {
           twiml.message('You have been removed from the UofSC advising center waitlist');
            msgFrom = msgFrom.replace(/\+1/g,"");
            Students.remove({PhoneNumber: msgFrom});
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }
        else if(msgBody == "Time"){
            msgFrom = msgFrom.replace(/\+1/g,"");
            var getTime = Students.findOne({PhoneNumber: msgFrom}).waitTime;
            //var waitTime = Students.findOne({},{limit:1, fields:{PhoneNumber: msgFrom}}).waitTime;
            twiml.message(' Your current wait time is: ' +getTime+' minutes.');
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }

        else {
            twiml.message('This is an invalid response. Please type "Remove" or "Time"');
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }
   // });

});
/*
Router.route('/admin', function(){
    this.render('adminPage');
});*/