(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;

/* Package-scope variables */
var Twilio;

(function(){

////////////////////////////////////////////////////////////////////////////
//                                                                        //
// packages/mrt_twilio-meteor/packages/mrt_twilio-meteor.js               //
//                                                                        //
////////////////////////////////////////////////////////////////////////////
                                                                          //
(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// packages/mrt:twilio-meteor/twilio_npm.js                          //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Twilio = Npm.require('twilio');                                      // 1
                                                                     // 2
///////////////////////////////////////////////////////////////////////

}).call(this);

////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['mrt:twilio-meteor'] = {}, {
  Twilio: Twilio
});

})();
