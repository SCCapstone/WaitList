import '../imports/api/students.js';
import '../imports/api/Archive';

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

Router.route('/:id',function(){
    this.render("secret");
    
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
        msgFrom = msgFrom.replace(/\+1/g,"");
        if(Students.findOne({PhoneNumber:msgFrom})){
         if(msgBody == "Remove"|| msgBody == " Remove" || msgBody == "Remove " || msgBody == "remove" || msgBody == " remove" || msgBody == "remove ") {
            twiml.message('You have been removed from the UofSC advising center waitlist');
            //msgFrom = msgFrom.replace(/\+1/g,"");

            var timestamp = Students.findOne({PhoneNumber:msgFrom}).createdAt;
            var status = Students.findOne({PhoneNumber:msgFrom}).currentStatus;
            var studentsWaiting = Students.find({currentStatus: "Waiting"}).count();

             var archiveName = Students.findOne({PhoneNumber:msgFrom}).Name;
             var archiveID = Students.findOne({PhoneNumber:msgFrom}).USCID;
             var archiveReason = Students.findOne({PhoneNumber:msgFrom}).ReasonForVisit;
             var archiveCurrMajor = Students.findOne({PhoneNumber:msgFrom}).CurrentMajor;
             if(Students.findOne({PhoneNumber:msgFrom}).IntendedMajor) {
                 var archiveIntMajor = Students.findOne({PhoneNumber:msgFrom}).IntendedMajor;
             }
             else{
                 var archiveIntMajor = "N/A";
             }
             if(Students.findOne({PhoneNumber:msgFrom}).Comments) {
                 var archiveComment = Students.findOne({PhoneNumber:msgFrom}).Comments;
                 archiveComment = archiveComment.replace(/,/g," ");
                 archiveComment = archiveComment.replace(/'/g,"");
             }
             else{
                 var archiveComment = "N/A";
             }
             Archive.insert({Name:archiveName,PhoneNumber:msgFrom, USCID:archiveID, ReasonForVisit:archiveReason,CurrentMajor:archiveCurrMajor,IntendedMajor:archiveIntMajor,Comments:archiveComment,createdAt:timestamp});

            if(status == "Waiting") {
                Meteor.call("updateWaitTime", timestamp);
                if (studentsWaiting > 3) {
                    var whoToContact = Students.findOne({waitTime: 30}).PhoneNumber;
                    var receiveText = Students.findOne({PhoneNumber: whoToContact}).Disclaimer;
                    if (receiveText == true) {
                        Meteor.call("getToUAC", whoToContact);
                    }
                }
            }

            /*var studentsWaitTime = Students.findOne({PhoneNumber:msgFrom}).waitTime;
            Students.update({waitTime:{$gt:studentsWaitTime}},{$inc:{waitTime: -15}},{multi:true});*/
            Students.remove({PhoneNumber: msgFrom});
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
         }
         else if(msgBody == "Time" || msgBody ==" Time" || msgBody == "Time " || msgBody == "time" || msgBody == " time" || msgBody == "time "){
            //msgFrom = msgFrom.replace(/\+1/g,"");
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
        }
        else{
            twiml.message('You are not on the University of South Carolina waitlist.')
            res.writeHead(200, {'Content-Type': 'text/xml'});
            res.end(twiml.toString());
        }
});
