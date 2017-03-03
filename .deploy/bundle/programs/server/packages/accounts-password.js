(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var NpmModuleBcrypt = Package['npm-bcrypt'].NpmModuleBcrypt;
var Accounts = Package['accounts-base'].Accounts;
var SRP = Package.srp.SRP;
var SHA256 = Package.sha.SHA256;
var EJSON = Package.ejson.EJSON;
var DDP = Package['ddp-client'].DDP;
var DDPServer = Package['ddp-server'].DDPServer;
var Email = Package.email.Email;
var EmailInternals = Package.email.EmailInternals;
var Random = Package.random.Random;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var ECMAScript = Package.ecmascript.ECMAScript;
var meteorInstall = Package.modules.meteorInstall;
var Buffer = Package.modules.Buffer;
var process = Package.modules.process;
var Symbol = Package['ecmascript-runtime'].Symbol;
var Map = Package['ecmascript-runtime'].Map;
var Set = Package['ecmascript-runtime'].Set;
var meteorBabelHelpers = Package['babel-runtime'].meteorBabelHelpers;
var Promise = Package.promise.Promise;

var require = meteorInstall({"node_modules":{"meteor":{"accounts-password":{"email_templates.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-password/email_templates.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
function greet(welcomeMsg) {                                                                                           // 1
  return function (user, url) {                                                                                        // 2
    var greeting = user.profile && user.profile.name ? "Hello " + user.profile.name + "," : "Hello,";                  // 3
    return greeting + "\n\n" + welcomeMsg + ", simply click the link below.\n\n" + url + "\n\nThanks.\n";              // 5
  };                                                                                                                   // 13
} /**                                                                                                                  // 14
   * @summary Options to customize emails sent from the Accounts system.                                               //
   * @locus Server                                                                                                     //
   * @importFromPackage accounts-base                                                                                  //
   */                                                                                                                  //
                                                                                                                       //
Accounts.emailTemplates = {                                                                                            // 21
  from: "Meteor Accounts <no-reply@meteor.com>",                                                                       // 22
  siteName: Meteor.absoluteUrl().replace(/^https?:\/\//, '').replace(/\/$/, ''),                                       // 23
  resetPassword: {                                                                                                     // 25
    subject: function (user) {                                                                                         // 26
      return "How to reset your password on " + Accounts.emailTemplates.siteName;                                      // 27
    },                                                                                                                 // 28
    text: greet("To reset your password")                                                                              // 29
  },                                                                                                                   // 25
  verifyEmail: {                                                                                                       // 31
    subject: function (user) {                                                                                         // 32
      return "How to verify email address on " + Accounts.emailTemplates.siteName;                                     // 33
    },                                                                                                                 // 34
    text: greet("To verify your account email")                                                                        // 35
  },                                                                                                                   // 31
  enrollAccount: {                                                                                                     // 37
    subject: function (user) {                                                                                         // 38
      return "An account has been created for you on " + Accounts.emailTemplates.siteName;                             // 39
    },                                                                                                                 // 40
    text: greet("To start using the service")                                                                          // 41
  }                                                                                                                    // 37
};                                                                                                                     // 21
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"password_server.js":["babel-runtime/helpers/typeof",function(require){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/accounts-password/password_server.js                                                                       //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
var _typeof2 = require("babel-runtime/helpers/typeof");                                                                //
                                                                                                                       //
var _typeof3 = _interopRequireDefault(_typeof2);                                                                       //
                                                                                                                       //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }                      //
                                                                                                                       //
/// BCRYPT                                                                                                             // 1
var bcrypt = NpmModuleBcrypt;                                                                                          // 3
var bcryptHash = Meteor.wrapAsync(bcrypt.hash);                                                                        // 4
var bcryptCompare = Meteor.wrapAsync(bcrypt.compare); // User records have a 'services.password.bcrypt' field on them to hold
// their hashed passwords (unless they have a 'services.password.srp'                                                  // 8
// field, in which case they will be upgraded to bcrypt the next time                                                  // 9
// they log in).                                                                                                       // 10
//                                                                                                                     // 11
// When the client sends a password to the server, it can either be a                                                  // 12
// string (the plaintext password) or an object with keys 'digest' and                                                 // 13
// 'algorithm' (must be "sha-256" for now). The Meteor client always sends                                             // 14
// password objects { digest: *, algorithm: "sha-256" }, but DDP clients                                               // 15
// that don't have access to SHA can just send plaintext passwords as                                                  // 16
// strings.                                                                                                            // 17
//                                                                                                                     // 18
// When the server receives a plaintext password as a string, it always                                                // 19
// hashes it with SHA256 before passing it into bcrypt. When the server                                                // 20
// receives a password as an object, it asserts that the algorithm is                                                  // 21
// "sha-256" and then passes the digest to bcrypt.                                                                     // 22
                                                                                                                       //
Accounts._bcryptRounds = 10; // Given a 'password' from the client, extract the string that we should                  // 25
// bcrypt. 'password' can be one of:                                                                                   // 28
//  - String (the plaintext password)                                                                                  // 29
//  - Object with 'digest' and 'algorithm' keys. 'algorithm' must be "sha-256".                                        // 30
//                                                                                                                     // 31
                                                                                                                       //
var getPasswordString = function (password) {                                                                          // 32
  if (typeof password === "string") {                                                                                  // 33
    password = SHA256(password);                                                                                       // 34
  } else {                                                                                                             // 35
    // 'password' is an object                                                                                         // 35
    if (password.algorithm !== "sha-256") {                                                                            // 36
      throw new Error("Invalid password hash algorithm. " + "Only 'sha-256' is allowed.");                             // 37
    }                                                                                                                  // 39
                                                                                                                       //
    password = password.digest;                                                                                        // 40
  }                                                                                                                    // 41
                                                                                                                       //
  return password;                                                                                                     // 42
}; // Use bcrypt to hash the password for storage in the database.                                                     // 43
// `password` can be a string (in which case it will be run through                                                    // 46
// SHA256 before bcrypt) or an object with properties `digest` and                                                     // 47
// `algorithm` (in which case we bcrypt `password.digest`).                                                            // 48
//                                                                                                                     // 49
                                                                                                                       //
                                                                                                                       //
var hashPassword = function (password) {                                                                               // 50
  password = getPasswordString(password);                                                                              // 51
  return bcryptHash(password, Accounts._bcryptRounds);                                                                 // 52
}; // Check whether the provided password matches the bcrypt'ed password in                                            // 53
// the database user record. `password` can be a string (in which case                                                 // 56
// it will be run through SHA256 before bcrypt) or an object with                                                      // 57
// properties `digest` and `algorithm` (in which case we bcrypt                                                        // 58
// `password.digest`).                                                                                                 // 59
//                                                                                                                     // 60
                                                                                                                       //
                                                                                                                       //
Accounts._checkPassword = function (user, password) {                                                                  // 61
  var result = {                                                                                                       // 62
    userId: user._id                                                                                                   // 63
  };                                                                                                                   // 62
  password = getPasswordString(password);                                                                              // 66
                                                                                                                       //
  if (!bcryptCompare(password, user.services.password.bcrypt)) {                                                       // 68
    result.error = new Meteor.Error(403, "Incorrect password");                                                        // 69
  }                                                                                                                    // 70
                                                                                                                       //
  return result;                                                                                                       // 72
};                                                                                                                     // 73
                                                                                                                       //
var checkPassword = Accounts._checkPassword; ///                                                                       // 74
/// LOGIN                                                                                                              // 77
///                                                                                                                    // 78
                                                                                                                       //
Accounts._findUserByQuery = function (query) {                                                                         // 80
  var user = null;                                                                                                     // 81
                                                                                                                       //
  if (query.id) {                                                                                                      // 83
    user = Meteor.users.findOne({                                                                                      // 84
      _id: query.id                                                                                                    // 84
    });                                                                                                                // 84
  } else {                                                                                                             // 85
    var fieldName;                                                                                                     // 86
    var fieldValue;                                                                                                    // 87
                                                                                                                       //
    if (query.username) {                                                                                              // 88
      fieldName = 'username';                                                                                          // 89
      fieldValue = query.username;                                                                                     // 90
    } else if (query.email) {                                                                                          // 91
      fieldName = 'emails.address';                                                                                    // 92
      fieldValue = query.email;                                                                                        // 93
    } else {                                                                                                           // 94
      throw new Error("shouldn't happen (validation missed something)");                                               // 95
    }                                                                                                                  // 96
                                                                                                                       //
    var selector = {};                                                                                                 // 97
    selector[fieldName] = fieldValue;                                                                                  // 98
    user = Meteor.users.findOne(selector); // If user is not found, try a case insensitive lookup                      // 99
                                                                                                                       //
    if (!user) {                                                                                                       // 101
      selector = selectorForFastCaseInsensitiveLookup(fieldName, fieldValue);                                          // 102
      var candidateUsers = Meteor.users.find(selector).fetch(); // No match if multiple candidates are found           // 103
                                                                                                                       //
      if (candidateUsers.length === 1) {                                                                               // 105
        user = candidateUsers[0];                                                                                      // 106
      }                                                                                                                // 107
    }                                                                                                                  // 108
  }                                                                                                                    // 109
                                                                                                                       //
  return user;                                                                                                         // 111
}; /**                                                                                                                 // 112
    * @summary Finds the user with the specified username.                                                             //
    * First tries to match username case sensitively; if that fails, it                                                //
    * tries case insensitively; but if more than one user matches the case                                             //
    * insensitive search, it returns null.                                                                             //
    * @locus Server                                                                                                    //
    * @param {String} username The username to look for                                                                //
    * @returns {Object} A user if found, else null                                                                     //
    * @importFromPackage accounts-base                                                                                 //
    */                                                                                                                 //
                                                                                                                       //
Accounts.findUserByUsername = function (username) {                                                                    // 124
  return Accounts._findUserByQuery({                                                                                   // 125
    username: username                                                                                                 // 126
  });                                                                                                                  // 125
}; /**                                                                                                                 // 128
    * @summary Finds the user with the specified email.                                                                //
    * First tries to match email case sensitively; if that fails, it                                                   //
    * tries case insensitively; but if more than one user matches the case                                             //
    * insensitive search, it returns null.                                                                             //
    * @locus Server                                                                                                    //
    * @param {String} email The email address to look for                                                              //
    * @returns {Object} A user if found, else null                                                                     //
    * @importFromPackage accounts-base                                                                                 //
    */                                                                                                                 //
                                                                                                                       //
Accounts.findUserByEmail = function (email) {                                                                          // 140
  return Accounts._findUserByQuery({                                                                                   // 141
    email: email                                                                                                       // 142
  });                                                                                                                  // 141
}; // Generates a MongoDB selector that can be used to perform a fast case                                             // 144
// insensitive lookup for the given fieldName and string. Since MongoDB does                                           // 147
// not support case insensitive indexes, and case insensitive regex queries                                            // 148
// are slow, we construct a set of prefix selectors for all permutations of                                            // 149
// the first 4 characters ourselves. We first attempt to matching against                                              // 150
// these, and because 'prefix expression' regex queries do use indexes (see                                            // 151
// http://docs.mongodb.org/v2.6/reference/operator/query/regex/#index-use),                                            // 152
// this has been found to greatly improve performance (from 1200ms to 5ms in a                                         // 153
// test with 1.000.000 users).                                                                                         // 154
                                                                                                                       //
                                                                                                                       //
var selectorForFastCaseInsensitiveLookup = function (fieldName, string) {                                              // 155
  // Performance seems to improve up to 4 prefix characters                                                            // 156
  var prefix = string.substring(0, Math.min(string.length, 4));                                                        // 157
                                                                                                                       //
  var orClause = _.map(generateCasePermutationsForString(prefix), function (prefixPermutation) {                       // 158
    var selector = {};                                                                                                 // 160
    selector[fieldName] = new RegExp('^' + Meteor._escapeRegExp(prefixPermutation));                                   // 161
    return selector;                                                                                                   // 163
  });                                                                                                                  // 164
                                                                                                                       //
  var caseInsensitiveClause = {};                                                                                      // 165
  caseInsensitiveClause[fieldName] = new RegExp('^' + Meteor._escapeRegExp(string) + '$', 'i');                        // 166
  return {                                                                                                             // 168
    $and: [{                                                                                                           // 168
      $or: orClause                                                                                                    // 168
    }, caseInsensitiveClause]                                                                                          // 168
  };                                                                                                                   // 168
}; // Generates permutations of all case variations of a given string.                                                 // 169
                                                                                                                       //
                                                                                                                       //
var generateCasePermutationsForString = function (string) {                                                            // 172
  var permutations = [''];                                                                                             // 173
                                                                                                                       //
  for (var i = 0; i < string.length; i++) {                                                                            // 174
    var ch = string.charAt(i);                                                                                         // 175
    permutations = _.flatten(_.map(permutations, function (prefix) {                                                   // 176
      var lowerCaseChar = ch.toLowerCase();                                                                            // 177
      var upperCaseChar = ch.toUpperCase(); // Don't add unneccesary permutations when ch is not a letter              // 178
                                                                                                                       //
      if (lowerCaseChar === upperCaseChar) {                                                                           // 180
        return [prefix + ch];                                                                                          // 181
      } else {                                                                                                         // 182
        return [prefix + lowerCaseChar, prefix + upperCaseChar];                                                       // 183
      }                                                                                                                // 184
    }));                                                                                                               // 185
  }                                                                                                                    // 186
                                                                                                                       //
  return permutations;                                                                                                 // 187
};                                                                                                                     // 188
                                                                                                                       //
var checkForCaseInsensitiveDuplicates = function (fieldName, displayName, fieldValue, ownUserId) {                     // 190
  // Some tests need the ability to add users with the same case insensitive                                           // 191
  // value, hence the _skipCaseInsensitiveChecksForTest check                                                          // 192
  var skipCheck = _.has(Accounts._skipCaseInsensitiveChecksForTest, fieldValue);                                       // 193
                                                                                                                       //
  if (fieldValue && !skipCheck) {                                                                                      // 195
    var matchedUsers = Meteor.users.find(selectorForFastCaseInsensitiveLookup(fieldName, fieldValue)).fetch();         // 196
                                                                                                                       //
    if (matchedUsers.length > 0 && ( // If we don't have a userId yet, any match we find is a duplicate                // 199
    !ownUserId || // Otherwise, check to see if there are multiple matches or a match                                  // 201
    // that is not us                                                                                                  // 203
    matchedUsers.length > 1 || matchedUsers[0]._id !== ownUserId)) {                                                   // 204
      throw new Meteor.Error(403, displayName + " already exists.");                                                   // 205
    }                                                                                                                  // 206
  }                                                                                                                    // 207
}; // XXX maybe this belongs in the check package                                                                      // 208
                                                                                                                       //
                                                                                                                       //
var NonEmptyString = Match.Where(function (x) {                                                                        // 211
  check(x, String);                                                                                                    // 212
  return x.length > 0;                                                                                                 // 213
});                                                                                                                    // 214
var userQueryValidator = Match.Where(function (user) {                                                                 // 216
  check(user, {                                                                                                        // 217
    id: Match.Optional(NonEmptyString),                                                                                // 218
    username: Match.Optional(NonEmptyString),                                                                          // 219
    email: Match.Optional(NonEmptyString)                                                                              // 220
  });                                                                                                                  // 217
  if (_.keys(user).length !== 1) throw new Match.Error("User property must have exactly one field");                   // 222
  return true;                                                                                                         // 224
});                                                                                                                    // 225
var passwordValidator = Match.OneOf(String, {                                                                          // 227
  digest: String,                                                                                                      // 229
  algorithm: String                                                                                                    // 229
}); // Handler to login with a password.                                                                               // 229
//                                                                                                                     // 233
// The Meteor client sets options.password to an object with keys                                                      // 234
// 'digest' (set to SHA256(password)) and 'algorithm' ("sha-256").                                                     // 235
//                                                                                                                     // 236
// For other DDP clients which don't have access to SHA, the handler                                                   // 237
// also accepts the plaintext password in options.password as a string.                                                // 238
//                                                                                                                     // 239
// (It might be nice if servers could turn the plaintext password                                                      // 240
// option off. Or maybe it should be opt-in, not opt-out?                                                              // 241
// Accounts.config option?)                                                                                            // 242
//                                                                                                                     // 243
// Note that neither password option is secure without SSL.                                                            // 244
//                                                                                                                     // 245
                                                                                                                       //
Accounts.registerLoginHandler("password", function (options) {                                                         // 246
  if (!options.password || options.srp) return undefined; // don't handle                                              // 247
                                                                                                                       //
  check(options, {                                                                                                     // 250
    user: userQueryValidator,                                                                                          // 251
    password: passwordValidator                                                                                        // 252
  });                                                                                                                  // 250
                                                                                                                       //
  var user = Accounts._findUserByQuery(options.user);                                                                  // 256
                                                                                                                       //
  if (!user) throw new Meteor.Error(403, "User not found");                                                            // 257
  if (!user.services || !user.services.password || !(user.services.password.bcrypt || user.services.password.srp)) throw new Meteor.Error(403, "User has no password set");
                                                                                                                       //
  if (!user.services.password.bcrypt) {                                                                                // 264
    if (typeof options.password === "string") {                                                                        // 265
      // The client has presented a plaintext password, and the user is                                                // 266
      // not upgraded to bcrypt yet. We don't attempt to tell the client                                               // 267
      // to upgrade to bcrypt, because it might be a standalone DDP                                                    // 268
      // client doesn't know how to do such a thing.                                                                   // 269
      var verifier = user.services.password.srp;                                                                       // 270
      var newVerifier = SRP.generateVerifier(options.password, {                                                       // 271
        identity: verifier.identity,                                                                                   // 272
        salt: verifier.salt                                                                                            // 272
      });                                                                                                              // 271
                                                                                                                       //
      if (verifier.verifier !== newVerifier.verifier) {                                                                // 274
        return {                                                                                                       // 275
          userId: user._id,                                                                                            // 276
          error: new Meteor.Error(403, "Incorrect password")                                                           // 277
        };                                                                                                             // 275
      }                                                                                                                // 279
                                                                                                                       //
      return {                                                                                                         // 281
        userId: user._id                                                                                               // 281
      };                                                                                                               // 281
    } else {                                                                                                           // 282
      // Tell the client to use the SRP upgrade process.                                                               // 283
      throw new Meteor.Error(400, "old password format", EJSON.stringify({                                             // 284
        format: 'srp',                                                                                                 // 285
        identity: user.services.password.srp.identity                                                                  // 286
      }));                                                                                                             // 284
    }                                                                                                                  // 288
  }                                                                                                                    // 289
                                                                                                                       //
  return checkPassword(user, options.password);                                                                        // 291
}); // Handler to login using the SRP upgrade path. To use this login                                                  // 295
// handler, the client must provide:                                                                                   // 298
//   - srp: H(identity + ":" + password)                                                                               // 299
//   - password: a string or an object with properties 'digest' and 'algorithm'                                        // 300
//                                                                                                                     // 301
// We use `options.srp` to verify that the client knows the correct                                                    // 302
// password without doing a full SRP flow. Once we've checked that, we                                                 // 303
// upgrade the user to bcrypt and remove the SRP information from the                                                  // 304
// user document.                                                                                                      // 305
//                                                                                                                     // 306
// The client ends up using this login handler after trying the normal                                                 // 307
// login handler (above), which throws an error telling the client to                                                  // 308
// try the SRP upgrade path.                                                                                           // 309
//                                                                                                                     // 310
// XXX COMPAT WITH 0.8.1.3                                                                                             // 311
                                                                                                                       //
Accounts.registerLoginHandler("password", function (options) {                                                         // 312
  if (!options.srp || !options.password) return undefined; // don't handle                                             // 313
                                                                                                                       //
  check(options, {                                                                                                     // 316
    user: userQueryValidator,                                                                                          // 317
    srp: String,                                                                                                       // 318
    password: passwordValidator                                                                                        // 319
  });                                                                                                                  // 316
                                                                                                                       //
  var user = Accounts._findUserByQuery(options.user);                                                                  // 322
                                                                                                                       //
  if (!user) throw new Meteor.Error(403, "User not found"); // Check to see if another simultaneous login has already upgraded
  // the user record to bcrypt.                                                                                        // 327
                                                                                                                       //
  if (user.services && user.services.password && user.services.password.bcrypt) return checkPassword(user, options.password);
  if (!(user.services && user.services.password && user.services.password.srp)) throw new Meteor.Error(403, "User has no password set");
  var v1 = user.services.password.srp.verifier;                                                                        // 334
  var v2 = SRP.generateVerifier(null, {                                                                                // 335
    hashedIdentityAndPassword: options.srp,                                                                            // 338
    salt: user.services.password.srp.salt                                                                              // 339
  }).verifier;                                                                                                         // 337
  if (v1 !== v2) return {                                                                                              // 342
    userId: user._id,                                                                                                  // 344
    error: new Meteor.Error(403, "Incorrect password")                                                                 // 345
  }; // Upgrade to bcrypt on successful login.                                                                         // 343
                                                                                                                       //
  var salted = hashPassword(options.password);                                                                         // 349
  Meteor.users.update(user._id, {                                                                                      // 350
    $unset: {                                                                                                          // 353
      'services.password.srp': 1                                                                                       // 353
    },                                                                                                                 // 353
    $set: {                                                                                                            // 354
      'services.password.bcrypt': salted                                                                               // 354
    }                                                                                                                  // 354
  });                                                                                                                  // 352
  return {                                                                                                             // 358
    userId: user._id                                                                                                   // 358
  };                                                                                                                   // 358
}); ///                                                                                                                // 359
/// CHANGING                                                                                                           // 363
///                                                                                                                    // 364
/**                                                                                                                    // 366
 * @summary Change a user's username. Use this instead of updating the                                                 //
 * database directly. The operation will fail if there is an existing user                                             //
 * with a username only differing in case.                                                                             //
 * @locus Server                                                                                                       //
 * @param {String} userId The ID of the user to update.                                                                //
 * @param {String} newUsername A new username for the user.                                                            //
 * @importFromPackage accounts-base                                                                                    //
 */                                                                                                                    //
                                                                                                                       //
Accounts.setUsername = function (userId, newUsername) {                                                                // 375
  check(userId, NonEmptyString);                                                                                       // 376
  check(newUsername, NonEmptyString);                                                                                  // 377
  var user = Meteor.users.findOne(userId);                                                                             // 379
  if (!user) throw new Meteor.Error(403, "User not found");                                                            // 380
  var oldUsername = user.username; // Perform a case insensitive check for duplicates before update                    // 383
                                                                                                                       //
  checkForCaseInsensitiveDuplicates('username', 'Username', newUsername, user._id);                                    // 386
  Meteor.users.update({                                                                                                // 388
    _id: user._id                                                                                                      // 388
  }, {                                                                                                                 // 388
    $set: {                                                                                                            // 388
      username: newUsername                                                                                            // 388
    }                                                                                                                  // 388
  }); // Perform another check after update, in case a matching user has been                                          // 388
  // inserted in the meantime                                                                                          // 391
                                                                                                                       //
  try {                                                                                                                // 392
    checkForCaseInsensitiveDuplicates('username', 'Username', newUsername, user._id);                                  // 393
  } catch (ex) {                                                                                                       // 394
    // Undo update if the check fails                                                                                  // 395
    Meteor.users.update({                                                                                              // 396
      _id: user._id                                                                                                    // 396
    }, {                                                                                                               // 396
      $set: {                                                                                                          // 396
        username: oldUsername                                                                                          // 396
      }                                                                                                                // 396
    });                                                                                                                // 396
    throw ex;                                                                                                          // 397
  }                                                                                                                    // 398
}; // Let the user change their own password if they know the old                                                      // 399
// password. `oldPassword` and `newPassword` should be objects with keys                                               // 402
// `digest` and `algorithm` (representing the SHA256 of the password).                                                 // 403
//                                                                                                                     // 404
// XXX COMPAT WITH 0.8.1.3                                                                                             // 405
// Like the login method, if the user hasn't been upgraded from SRP to                                                 // 406
// bcrypt yet, then this method will throw an 'old password format'                                                    // 407
// error. The client should call the SRP upgrade login handler and then                                                // 408
// retry this method again.                                                                                            // 409
//                                                                                                                     // 410
// UNLIKE the login method, there is no way to avoid getting SRP upgrade                                               // 411
// errors thrown. The reasoning for this is that clients using this                                                    // 412
// method directly will need to be updated anyway because we no longer                                                 // 413
// support the SRP flow that they would have been doing to use this                                                    // 414
// method previously.                                                                                                  // 415
                                                                                                                       //
                                                                                                                       //
Meteor.methods({                                                                                                       // 416
  changePassword: function (oldPassword, newPassword) {                                                                // 416
    check(oldPassword, passwordValidator);                                                                             // 417
    check(newPassword, passwordValidator);                                                                             // 418
    if (!this.userId) throw new Meteor.Error(401, "Must be logged in");                                                // 420
    var user = Meteor.users.findOne(this.userId);                                                                      // 423
    if (!user) throw new Meteor.Error(403, "User not found");                                                          // 424
    if (!user.services || !user.services.password || !user.services.password.bcrypt && !user.services.password.srp) throw new Meteor.Error(403, "User has no password set");
                                                                                                                       //
    if (!user.services.password.bcrypt) {                                                                              // 431
      throw new Meteor.Error(400, "old password format", EJSON.stringify({                                             // 432
        format: 'srp',                                                                                                 // 433
        identity: user.services.password.srp.identity                                                                  // 434
      }));                                                                                                             // 432
    }                                                                                                                  // 436
                                                                                                                       //
    var result = checkPassword(user, oldPassword);                                                                     // 438
    if (result.error) throw result.error;                                                                              // 439
    var hashed = hashPassword(newPassword); // It would be better if this removed ALL existing tokens and replaced     // 442
    // the token for the current connection with a new one, but that would                                             // 445
    // be tricky, so we'll settle for just replacing all tokens other than                                             // 446
    // the one for the current connection.                                                                             // 447
                                                                                                                       //
    var currentToken = Accounts._getLoginToken(this.connection.id);                                                    // 448
                                                                                                                       //
    Meteor.users.update({                                                                                              // 449
      _id: this.userId                                                                                                 // 450
    }, {                                                                                                               // 450
      $set: {                                                                                                          // 452
        'services.password.bcrypt': hashed                                                                             // 452
      },                                                                                                               // 452
      $pull: {                                                                                                         // 453
        'services.resume.loginTokens': {                                                                               // 454
          hashedToken: {                                                                                               // 454
            $ne: currentToken                                                                                          // 454
          }                                                                                                            // 454
        }                                                                                                              // 454
      },                                                                                                               // 453
      $unset: {                                                                                                        // 456
        'services.password.reset': 1                                                                                   // 456
      }                                                                                                                // 456
    });                                                                                                                // 451
    return {                                                                                                           // 460
      passwordChanged: true                                                                                            // 460
    };                                                                                                                 // 460
  }                                                                                                                    // 461
}); // Force change the users password.                                                                                // 416
/**                                                                                                                    // 466
 * @summary Forcibly change the password for a user.                                                                   //
 * @locus Server                                                                                                       //
 * @param {String} userId The id of the user to update.                                                                //
 * @param {String} newPassword A new password for the user.                                                            //
 * @param {Object} [options]                                                                                           //
 * @param {Object} options.logout Logout all current connections with this userId (default: true)                      //
 * @importFromPackage accounts-base                                                                                    //
 */                                                                                                                    //
                                                                                                                       //
Accounts.setPassword = function (userId, newPlaintextPassword, options) {                                              // 475
  options = _.extend({                                                                                                 // 476
    logout: true                                                                                                       // 476
  }, options);                                                                                                         // 476
  var user = Meteor.users.findOne(userId);                                                                             // 478
  if (!user) throw new Meteor.Error(403, "User not found");                                                            // 479
  var update = {                                                                                                       // 482
    $unset: {                                                                                                          // 483
      'services.password.srp': 1,                                                                                      // 484
      // XXX COMPAT WITH 0.8.1.3                                                                                       // 484
      'services.password.reset': 1                                                                                     // 485
    },                                                                                                                 // 483
    $set: {                                                                                                            // 487
      'services.password.bcrypt': hashPassword(newPlaintextPassword)                                                   // 487
    }                                                                                                                  // 487
  };                                                                                                                   // 482
                                                                                                                       //
  if (options.logout) {                                                                                                // 490
    update.$unset['services.resume.loginTokens'] = 1;                                                                  // 491
  }                                                                                                                    // 492
                                                                                                                       //
  Meteor.users.update({                                                                                                // 494
    _id: user._id                                                                                                      // 494
  }, update);                                                                                                          // 494
}; ///                                                                                                                 // 495
/// RESETTING VIA EMAIL                                                                                                // 499
///                                                                                                                    // 500
// Method called by a user to request a password reset email. This is                                                  // 502
// the start of the reset process.                                                                                     // 503
                                                                                                                       //
                                                                                                                       //
Meteor.methods({                                                                                                       // 504
  forgotPassword: function (options) {                                                                                 // 504
    check(options, {                                                                                                   // 505
      email: String                                                                                                    // 505
    });                                                                                                                // 505
    var user = Accounts.findUserByEmail(options.email);                                                                // 507
    if (!user) throw new Meteor.Error(403, "User not found");                                                          // 508
                                                                                                                       //
    var emails = _.pluck(user.emails || [], 'address');                                                                // 511
                                                                                                                       //
    var caseSensitiveEmail = _.find(emails, function (email) {                                                         // 512
      return email.toLowerCase() === options.email.toLowerCase();                                                      // 513
    });                                                                                                                // 514
                                                                                                                       //
    Accounts.sendResetPasswordEmail(user._id, caseSensitiveEmail);                                                     // 516
  }                                                                                                                    // 517
}); // send the user an email with a link that when opened allows the user                                             // 504
// to set a new password, without the old password.                                                                    // 520
/**                                                                                                                    // 522
 * @summary Send an email with a link the user can use to reset their password.                                        //
 * @locus Server                                                                                                       //
 * @param {String} userId The id of the user to send email to.                                                         //
 * @param {String} [email] Optional. Which address of the user's to send the email to. This address must be in the user's `emails` list. Defaults to the first email in the list.
 * @importFromPackage accounts-base                                                                                    //
 */                                                                                                                    //
                                                                                                                       //
Accounts.sendResetPasswordEmail = function (userId, email) {                                                           // 529
  // Make sure the user exists, and email is one of their addresses.                                                   // 530
  var user = Meteor.users.findOne(userId);                                                                             // 531
  if (!user) throw new Error("Can't find user"); // pick the first email if we weren't passed an email.                // 532
                                                                                                                       //
  if (!email && user.emails && user.emails[0]) email = user.emails[0].address; // make sure we have a valid email      // 535
                                                                                                                       //
  if (!email || !_.contains(_.pluck(user.emails || [], 'address'), email)) throw new Error("No such email for user.");
  var token = Random.secret();                                                                                         // 541
  var when = new Date();                                                                                               // 542
  var tokenRecord = {                                                                                                  // 543
    token: token,                                                                                                      // 544
    email: email,                                                                                                      // 545
    when: when,                                                                                                        // 546
    reason: 'reset'                                                                                                    // 547
  };                                                                                                                   // 543
  Meteor.users.update(userId, {                                                                                        // 549
    $set: {                                                                                                            // 549
      "services.password.reset": tokenRecord                                                                           // 550
    }                                                                                                                  // 549
  }); // before passing to template, update user object with new token                                                 // 549
                                                                                                                       //
  Meteor._ensure(user, 'services', 'password').reset = tokenRecord;                                                    // 553
  var resetPasswordUrl = Accounts.urls.resetPassword(token);                                                           // 555
  var options = {                                                                                                      // 557
    to: email,                                                                                                         // 558
    from: Accounts.emailTemplates.resetPassword.from ? Accounts.emailTemplates.resetPassword.from(user) : Accounts.emailTemplates.from,
    subject: Accounts.emailTemplates.resetPassword.subject(user)                                                       // 562
  };                                                                                                                   // 557
                                                                                                                       //
  if (typeof Accounts.emailTemplates.resetPassword.text === 'function') {                                              // 565
    options.text = Accounts.emailTemplates.resetPassword.text(user, resetPasswordUrl);                                 // 566
  }                                                                                                                    // 568
                                                                                                                       //
  if (typeof Accounts.emailTemplates.resetPassword.html === 'function') options.html = Accounts.emailTemplates.resetPassword.html(user, resetPasswordUrl);
                                                                                                                       //
  if ((0, _typeof3.default)(Accounts.emailTemplates.headers) === 'object') {                                           // 574
    options.headers = Accounts.emailTemplates.headers;                                                                 // 575
  }                                                                                                                    // 576
                                                                                                                       //
  Email.send(options);                                                                                                 // 578
}; // send the user an email informing them that their account was created, with                                       // 579
// a link that when opened both marks their email as verified and forces them                                          // 582
// to choose their password. The email must be one of the addresses in the                                             // 583
// user's emails field, or undefined to pick the first email automatically.                                            // 584
//                                                                                                                     // 585
// This is not called automatically. It must be called manually if you                                                 // 586
// want to use enrollment emails.                                                                                      // 587
/**                                                                                                                    // 589
 * @summary Send an email with a link the user can use to set their initial password.                                  //
 * @locus Server                                                                                                       //
 * @param {String} userId The id of the user to send email to.                                                         //
 * @param {String} [email] Optional. Which address of the user's to send the email to. This address must be in the user's `emails` list. Defaults to the first email in the list.
 * @importFromPackage accounts-base                                                                                    //
 */                                                                                                                    //
                                                                                                                       //
Accounts.sendEnrollmentEmail = function (userId, email) {                                                              // 596
  // XXX refactor! This is basically identical to sendResetPasswordEmail.                                              // 597
  // Make sure the user exists, and email is in their addresses.                                                       // 599
  var user = Meteor.users.findOne(userId);                                                                             // 600
  if (!user) throw new Error("Can't find user"); // pick the first email if we weren't passed an email.                // 601
                                                                                                                       //
  if (!email && user.emails && user.emails[0]) email = user.emails[0].address; // make sure we have a valid email      // 604
                                                                                                                       //
  if (!email || !_.contains(_.pluck(user.emails || [], 'address'), email)) throw new Error("No such email for user.");
  var token = Random.secret();                                                                                         // 610
  var when = new Date();                                                                                               // 611
  var tokenRecord = {                                                                                                  // 612
    token: token,                                                                                                      // 613
    email: email,                                                                                                      // 614
    when: when,                                                                                                        // 615
    reason: 'enroll'                                                                                                   // 616
  };                                                                                                                   // 612
  Meteor.users.update(userId, {                                                                                        // 618
    $set: {                                                                                                            // 618
      "services.password.reset": tokenRecord                                                                           // 619
    }                                                                                                                  // 618
  }); // before passing to template, update user object with new token                                                 // 618
                                                                                                                       //
  Meteor._ensure(user, 'services', 'password').reset = tokenRecord;                                                    // 623
  var enrollAccountUrl = Accounts.urls.enrollAccount(token);                                                           // 625
  var options = {                                                                                                      // 627
    to: email,                                                                                                         // 628
    from: Accounts.emailTemplates.enrollAccount.from ? Accounts.emailTemplates.enrollAccount.from(user) : Accounts.emailTemplates.from,
    subject: Accounts.emailTemplates.enrollAccount.subject(user)                                                       // 632
  };                                                                                                                   // 627
                                                                                                                       //
  if (typeof Accounts.emailTemplates.enrollAccount.text === 'function') {                                              // 635
    options.text = Accounts.emailTemplates.enrollAccount.text(user, enrollAccountUrl);                                 // 636
  }                                                                                                                    // 638
                                                                                                                       //
  if (typeof Accounts.emailTemplates.enrollAccount.html === 'function') options.html = Accounts.emailTemplates.enrollAccount.html(user, enrollAccountUrl);
                                                                                                                       //
  if ((0, _typeof3.default)(Accounts.emailTemplates.headers) === 'object') {                                           // 644
    options.headers = Accounts.emailTemplates.headers;                                                                 // 645
  }                                                                                                                    // 646
                                                                                                                       //
  Email.send(options);                                                                                                 // 648
}; // Take token from sendResetPasswordEmail or sendEnrollmentEmail, change                                            // 649
// the users password, and log them in.                                                                                // 653
                                                                                                                       //
                                                                                                                       //
Meteor.methods({                                                                                                       // 654
  resetPassword: function (token, newPassword) {                                                                       // 654
    var self = this;                                                                                                   // 655
    return Accounts._loginMethod(self, "resetPassword", arguments, "password", function () {                           // 656
      check(token, String);                                                                                            // 662
      check(newPassword, passwordValidator);                                                                           // 663
      var user = Meteor.users.findOne({                                                                                // 665
        "services.password.reset.token": token                                                                         // 666
      });                                                                                                              // 665
      if (!user) throw new Meteor.Error(403, "Token expired");                                                         // 667
      var when = user.services.password.reset.when;                                                                    // 669
      var reason = user.services.password.reset.reason;                                                                // 670
                                                                                                                       //
      var tokenLifetimeMs = Accounts._getPasswordResetTokenLifetimeMs();                                               // 671
                                                                                                                       //
      if (reason === "enroll") {                                                                                       // 672
        tokenLifetimeMs = Accounts._getPasswordEnrollTokenLifetimeMs();                                                // 673
      }                                                                                                                // 674
                                                                                                                       //
      var currentTimeMs = Date.now();                                                                                  // 675
      if (currentTimeMs - when > tokenLifetimeMs) throw new Meteor.Error(403, "Token expired");                        // 676
      var email = user.services.password.reset.email;                                                                  // 678
      if (!_.include(_.pluck(user.emails || [], 'address'), email)) return {                                           // 679
        userId: user._id,                                                                                              // 681
        error: new Meteor.Error(403, "Token has invalid email address")                                                // 682
      };                                                                                                               // 680
      var hashed = hashPassword(newPassword); // NOTE: We're about to invalidate tokens on the user, who we might be   // 685
      // logged in as. Make sure to avoid logging ourselves out if this                                                // 688
      // happens. But also make sure not to leave the connection in a state                                            // 689
      // of having a bad token set if things fail.                                                                     // 690
                                                                                                                       //
      var oldToken = Accounts._getLoginToken(self.connection.id);                                                      // 691
                                                                                                                       //
      Accounts._setLoginToken(user._id, self.connection, null);                                                        // 692
                                                                                                                       //
      var resetToOldToken = function () {                                                                              // 693
        Accounts._setLoginToken(user._id, self.connection, oldToken);                                                  // 694
      };                                                                                                               // 695
                                                                                                                       //
      try {                                                                                                            // 697
        // Update the user record by:                                                                                  // 698
        // - Changing the password to the new one                                                                      // 699
        // - Forgetting about the reset token that was just used                                                       // 700
        // - Verifying their email, since they got the password reset via email.                                       // 701
        var affectedRecords = Meteor.users.update({                                                                    // 702
          _id: user._id,                                                                                               // 704
          'emails.address': email,                                                                                     // 705
          'services.password.reset.token': token                                                                       // 706
        }, {                                                                                                           // 703
          $set: {                                                                                                      // 708
            'services.password.bcrypt': hashed,                                                                        // 708
            'emails.$.verified': true                                                                                  // 709
          },                                                                                                           // 708
          $unset: {                                                                                                    // 710
            'services.password.reset': 1,                                                                              // 710
            'services.password.srp': 1                                                                                 // 711
          }                                                                                                            // 710
        });                                                                                                            // 708
        if (affectedRecords !== 1) return {                                                                            // 712
          userId: user._id,                                                                                            // 714
          error: new Meteor.Error(403, "Invalid email")                                                                // 715
        };                                                                                                             // 713
      } catch (err) {                                                                                                  // 717
        resetToOldToken();                                                                                             // 718
        throw err;                                                                                                     // 719
      } // Replace all valid login tokens with new ones (changing                                                      // 720
      // password should invalidate existing sessions).                                                                // 723
                                                                                                                       //
                                                                                                                       //
      Accounts._clearAllLoginTokens(user._id);                                                                         // 724
                                                                                                                       //
      return {                                                                                                         // 726
        userId: user._id                                                                                               // 726
      };                                                                                                               // 726
    });                                                                                                                // 727
  }                                                                                                                    // 729
}); ///                                                                                                                // 654
/// EMAIL VERIFICATION                                                                                                 // 732
///                                                                                                                    // 733
// send the user an email with a link that when opened marks that                                                      // 736
// address as verified                                                                                                 // 737
/**                                                                                                                    // 739
 * @summary Send an email with a link the user can use verify their email address.                                     //
 * @locus Server                                                                                                       //
 * @param {String} userId The id of the user to send email to.                                                         //
 * @param {String} [email] Optional. Which address of the user's to send the email to. This address must be in the user's `emails` list. Defaults to the first unverified email in the list.
 * @importFromPackage accounts-base                                                                                    //
 */                                                                                                                    //
                                                                                                                       //
Accounts.sendVerificationEmail = function (userId, address) {                                                          // 746
  // XXX Also generate a link using which someone can delete this                                                      // 747
  // account if they own said address but weren't those who created                                                    // 748
  // this account.                                                                                                     // 749
  // Make sure the user exists, and address is one of their addresses.                                                 // 751
  var user = Meteor.users.findOne(userId);                                                                             // 752
  if (!user) throw new Error("Can't find user"); // pick the first unverified address if we weren't passed an address.
                                                                                                                       //
  if (!address) {                                                                                                      // 756
    var email = _.find(user.emails || [], function (e) {                                                               // 757
      return !e.verified;                                                                                              // 758
    });                                                                                                                // 758
                                                                                                                       //
    address = (email || {}).address;                                                                                   // 759
                                                                                                                       //
    if (!address) {                                                                                                    // 761
      throw new Error("That user has no unverified email addresses.");                                                 // 762
    }                                                                                                                  // 763
  } // make sure we have a valid address                                                                               // 764
                                                                                                                       //
                                                                                                                       //
  if (!address || !_.contains(_.pluck(user.emails || [], 'address'), address)) throw new Error("No such email address for user.");
  var tokenRecord = {                                                                                                  // 770
    token: Random.secret(),                                                                                            // 771
    address: address,                                                                                                  // 772
    when: new Date()                                                                                                   // 773
  };                                                                                                                   // 770
  Meteor.users.update({                                                                                                // 774
    _id: userId                                                                                                        // 775
  }, {                                                                                                                 // 775
    $push: {                                                                                                           // 776
      'services.email.verificationTokens': tokenRecord                                                                 // 776
    }                                                                                                                  // 776
  }); // before passing to template, update user object with new token                                                 // 776
                                                                                                                       //
  Meteor._ensure(user, 'services', 'email');                                                                           // 779
                                                                                                                       //
  if (!user.services.email.verificationTokens) {                                                                       // 780
    user.services.email.verificationTokens = [];                                                                       // 781
  }                                                                                                                    // 782
                                                                                                                       //
  user.services.email.verificationTokens.push(tokenRecord);                                                            // 783
  var verifyEmailUrl = Accounts.urls.verifyEmail(tokenRecord.token);                                                   // 785
  var options = {                                                                                                      // 787
    to: address,                                                                                                       // 788
    from: Accounts.emailTemplates.verifyEmail.from ? Accounts.emailTemplates.verifyEmail.from(user) : Accounts.emailTemplates.from,
    subject: Accounts.emailTemplates.verifyEmail.subject(user)                                                         // 792
  };                                                                                                                   // 787
                                                                                                                       //
  if (typeof Accounts.emailTemplates.verifyEmail.text === 'function') {                                                // 795
    options.text = Accounts.emailTemplates.verifyEmail.text(user, verifyEmailUrl);                                     // 796
  }                                                                                                                    // 798
                                                                                                                       //
  if (typeof Accounts.emailTemplates.verifyEmail.html === 'function') options.html = Accounts.emailTemplates.verifyEmail.html(user, verifyEmailUrl);
                                                                                                                       //
  if ((0, _typeof3.default)(Accounts.emailTemplates.headers) === 'object') {                                           // 804
    options.headers = Accounts.emailTemplates.headers;                                                                 // 805
  }                                                                                                                    // 806
                                                                                                                       //
  Email.send(options);                                                                                                 // 808
}; // Take token from sendVerificationEmail, mark the email as verified,                                               // 809
// and log them in.                                                                                                    // 812
                                                                                                                       //
                                                                                                                       //
Meteor.methods({                                                                                                       // 813
  verifyEmail: function (token) {                                                                                      // 813
    var self = this;                                                                                                   // 814
    return Accounts._loginMethod(self, "verifyEmail", arguments, "password", function () {                             // 815
      check(token, String);                                                                                            // 821
      var user = Meteor.users.findOne({                                                                                // 823
        'services.email.verificationTokens.token': token                                                               // 824
      });                                                                                                              // 824
      if (!user) throw new Meteor.Error(403, "Verify email link expired");                                             // 825
                                                                                                                       //
      var tokenRecord = _.find(user.services.email.verificationTokens, function (t) {                                  // 828
        return t.token == token;                                                                                       // 830
      });                                                                                                              // 831
                                                                                                                       //
      if (!tokenRecord) return {                                                                                       // 832
        userId: user._id,                                                                                              // 834
        error: new Meteor.Error(403, "Verify email link expired")                                                      // 835
      };                                                                                                               // 833
                                                                                                                       //
      var emailsRecord = _.find(user.emails, function (e) {                                                            // 838
        return e.address == tokenRecord.address;                                                                       // 839
      });                                                                                                              // 840
                                                                                                                       //
      if (!emailsRecord) return {                                                                                      // 841
        userId: user._id,                                                                                              // 843
        error: new Meteor.Error(403, "Verify email link is for unknown address")                                       // 844
      }; // By including the address in the query, we can use 'emails.$' in the                                        // 842
      // modifier to get a reference to the specific object in the emails                                              // 848
      // array. See                                                                                                    // 849
      // http://www.mongodb.org/display/DOCS/Updating/#Updating-The%24positionaloperator)                              // 850
      // http://www.mongodb.org/display/DOCS/Updating#Updating-%24pull                                                 // 851
                                                                                                                       //
      Meteor.users.update({                                                                                            // 852
        _id: user._id,                                                                                                 // 853
        'emails.address': tokenRecord.address                                                                          // 854
      }, {                                                                                                             // 853
        $set: {                                                                                                        // 855
          'emails.$.verified': true                                                                                    // 855
        },                                                                                                             // 855
        $pull: {                                                                                                       // 856
          'services.email.verificationTokens': {                                                                       // 856
            address: tokenRecord.address                                                                               // 856
          }                                                                                                            // 856
        }                                                                                                              // 856
      });                                                                                                              // 855
      return {                                                                                                         // 858
        userId: user._id                                                                                               // 858
      };                                                                                                               // 858
    });                                                                                                                // 859
  }                                                                                                                    // 861
}); /**                                                                                                                // 813
     * @summary Add an email address for a user. Use this instead of directly                                          //
     * updating the database. The operation will fail if there is a different user                                     //
     * with an email only differing in case. If the specified user has an existing                                     //
     * email only differing in case however, we replace it.                                                            //
     * @locus Server                                                                                                   //
     * @param {String} userId The ID of the user to update.                                                            //
     * @param {String} newEmail A new email address for the user.                                                      //
     * @param {Boolean} [verified] Optional - whether the new email address should                                     //
     * be marked as verified. Defaults to false.                                                                       //
     * @importFromPackage accounts-base                                                                                //
     */                                                                                                                //
                                                                                                                       //
Accounts.addEmail = function (userId, newEmail, verified) {                                                            // 875
  check(userId, NonEmptyString);                                                                                       // 876
  check(newEmail, NonEmptyString);                                                                                     // 877
  check(verified, Match.Optional(Boolean));                                                                            // 878
                                                                                                                       //
  if (_.isUndefined(verified)) {                                                                                       // 880
    verified = false;                                                                                                  // 881
  }                                                                                                                    // 882
                                                                                                                       //
  var user = Meteor.users.findOne(userId);                                                                             // 884
  if (!user) throw new Meteor.Error(403, "User not found"); // Allow users to change their own email to a version with a different case
  // We don't have to call checkForCaseInsensitiveDuplicates to do a case                                              // 890
  // insensitive check across all emails in the database here because: (1) if                                          // 891
  // there is no case-insensitive duplicate between this user and other users,                                         // 892
  // then we are OK and (2) if this would create a conflict with other users                                           // 893
  // then there would already be a case-insensitive duplicate and we can't fix                                         // 894
  // that in this code anyway.                                                                                         // 895
                                                                                                                       //
  var caseInsensitiveRegExp = new RegExp('^' + Meteor._escapeRegExp(newEmail) + '$', 'i');                             // 896
                                                                                                                       //
  var didUpdateOwnEmail = _.any(user.emails, function (email, index) {                                                 // 899
    if (caseInsensitiveRegExp.test(email.address)) {                                                                   // 900
      Meteor.users.update({                                                                                            // 901
        _id: user._id,                                                                                                 // 902
        'emails.address': email.address                                                                                // 903
      }, {                                                                                                             // 901
        $set: {                                                                                                        // 904
          'emails.$.address': newEmail,                                                                                // 905
          'emails.$.verified': verified                                                                                // 906
        }                                                                                                              // 904
      });                                                                                                              // 904
      return true;                                                                                                     // 908
    }                                                                                                                  // 909
                                                                                                                       //
    return false;                                                                                                      // 911
  }); // In the other updates below, we have to do another call to                                                     // 912
  // checkForCaseInsensitiveDuplicates to make sure that no conflicting values                                         // 915
  // were added to the database in the meantime. We don't have to do this for                                          // 916
  // the case where the user is updating their email address to one that is the                                        // 917
  // same as before, but only different because of capitalization. Read the                                            // 918
  // big comment above to understand why.                                                                              // 919
                                                                                                                       //
                                                                                                                       //
  if (didUpdateOwnEmail) {                                                                                             // 921
    return;                                                                                                            // 922
  } // Perform a case insensitive check for duplicates before update                                                   // 923
                                                                                                                       //
                                                                                                                       //
  checkForCaseInsensitiveDuplicates('emails.address', 'Email', newEmail, user._id);                                    // 926
  Meteor.users.update({                                                                                                // 928
    _id: user._id                                                                                                      // 929
  }, {                                                                                                                 // 928
    $addToSet: {                                                                                                       // 931
      emails: {                                                                                                        // 932
        address: newEmail,                                                                                             // 933
        verified: verified                                                                                             // 934
      }                                                                                                                // 932
    }                                                                                                                  // 931
  }); // Perform another check after update, in case a matching user has been                                          // 930
  // inserted in the meantime                                                                                          // 940
                                                                                                                       //
  try {                                                                                                                // 941
    checkForCaseInsensitiveDuplicates('emails.address', 'Email', newEmail, user._id);                                  // 942
  } catch (ex) {                                                                                                       // 943
    // Undo update if the check fails                                                                                  // 944
    Meteor.users.update({                                                                                              // 945
      _id: user._id                                                                                                    // 945
    }, {                                                                                                               // 945
      $pull: {                                                                                                         // 946
        emails: {                                                                                                      // 946
          address: newEmail                                                                                            // 946
        }                                                                                                              // 946
      }                                                                                                                // 946
    });                                                                                                                // 946
    throw ex;                                                                                                          // 947
  }                                                                                                                    // 948
}; /**                                                                                                                 // 949
    * @summary Remove an email address for a user. Use this instead of updating                                        //
    * the database directly.                                                                                           //
    * @locus Server                                                                                                    //
    * @param {String} userId The ID of the user to update.                                                             //
    * @param {String} email The email address to remove.                                                               //
    * @importFromPackage accounts-base                                                                                 //
    */                                                                                                                 //
                                                                                                                       //
Accounts.removeEmail = function (userId, email) {                                                                      // 959
  check(userId, NonEmptyString);                                                                                       // 960
  check(email, NonEmptyString);                                                                                        // 961
  var user = Meteor.users.findOne(userId);                                                                             // 963
  if (!user) throw new Meteor.Error(403, "User not found");                                                            // 964
  Meteor.users.update({                                                                                                // 967
    _id: user._id                                                                                                      // 967
  }, {                                                                                                                 // 967
    $pull: {                                                                                                           // 968
      emails: {                                                                                                        // 968
        address: email                                                                                                 // 968
      }                                                                                                                // 968
    }                                                                                                                  // 968
  });                                                                                                                  // 968
}; ///                                                                                                                 // 969
/// CREATING USERS                                                                                                     // 972
///                                                                                                                    // 973
// Shared createUser function called from the createUser method, both                                                  // 975
// if originates in client or server code. Calls user provided hooks,                                                  // 976
// does the actual user insertion.                                                                                     // 977
//                                                                                                                     // 978
// returns the user id                                                                                                 // 979
                                                                                                                       //
                                                                                                                       //
var createUser = function (options) {                                                                                  // 980
  // Unknown keys allowed, because a onCreateUserHook can take arbitrary                                               // 981
  // options.                                                                                                          // 982
  check(options, Match.ObjectIncluding({                                                                               // 983
    username: Match.Optional(String),                                                                                  // 984
    email: Match.Optional(String),                                                                                     // 985
    password: Match.Optional(passwordValidator)                                                                        // 986
  }));                                                                                                                 // 983
  var username = options.username;                                                                                     // 989
  var email = options.email;                                                                                           // 990
  if (!username && !email) throw new Meteor.Error(400, "Need to set a username or email");                             // 991
  var user = {                                                                                                         // 994
    services: {}                                                                                                       // 994
  };                                                                                                                   // 994
                                                                                                                       //
  if (options.password) {                                                                                              // 995
    var hashed = hashPassword(options.password);                                                                       // 996
    user.services.password = {                                                                                         // 997
      bcrypt: hashed                                                                                                   // 997
    };                                                                                                                 // 997
  }                                                                                                                    // 998
                                                                                                                       //
  if (username) user.username = username;                                                                              // 1000
  if (email) user.emails = [{                                                                                          // 1002
    address: email,                                                                                                    // 1003
    verified: false                                                                                                    // 1003
  }]; // Perform a case insensitive check before insert                                                                // 1003
                                                                                                                       //
  checkForCaseInsensitiveDuplicates('username', 'Username', username);                                                 // 1006
  checkForCaseInsensitiveDuplicates('emails.address', 'Email', email);                                                 // 1007
  var userId = Accounts.insertUserDoc(options, user); // Perform another check after insert, in case a matching user has been
  // inserted in the meantime                                                                                          // 1011
                                                                                                                       //
  try {                                                                                                                // 1012
    checkForCaseInsensitiveDuplicates('username', 'Username', username, userId);                                       // 1013
    checkForCaseInsensitiveDuplicates('emails.address', 'Email', email, userId);                                       // 1014
  } catch (ex) {                                                                                                       // 1015
    // Remove inserted user if the check fails                                                                         // 1016
    Meteor.users.remove(userId);                                                                                       // 1017
    throw ex;                                                                                                          // 1018
  }                                                                                                                    // 1019
                                                                                                                       //
  return userId;                                                                                                       // 1020
}; // method for create user. Requests come from the client.                                                           // 1021
                                                                                                                       //
                                                                                                                       //
Meteor.methods({                                                                                                       // 1024
  createUser: function (options) {                                                                                     // 1024
    var self = this;                                                                                                   // 1025
    return Accounts._loginMethod(self, "createUser", arguments, "password", function () {                              // 1026
      // createUser() above does more checking.                                                                        // 1032
      check(options, Object);                                                                                          // 1033
      if (Accounts._options.forbidClientAccountCreation) return {                                                      // 1034
        error: new Meteor.Error(403, "Signups forbidden")                                                              // 1036
      }; // Create user. result contains id and token.                                                                 // 1035
                                                                                                                       //
      var userId = createUser(options); // safety belt. createUser is supposed to throw on error. send 500 error       // 1040
      // instead of sending a verification email with empty userid.                                                    // 1042
                                                                                                                       //
      if (!userId) throw new Error("createUser failed to insert new user"); // If `Accounts._options.sendVerificationEmail` is set, register
      // a token to verify the user's primary email, and send it to                                                    // 1047
      // that address.                                                                                                 // 1048
                                                                                                                       //
      if (options.email && Accounts._options.sendVerificationEmail) Accounts.sendVerificationEmail(userId, options.email); // client gets logged in as the new user afterwards.
                                                                                                                       //
      return {                                                                                                         // 1053
        userId: userId                                                                                                 // 1053
      };                                                                                                               // 1053
    });                                                                                                                // 1054
  }                                                                                                                    // 1056
}); // Create user directly on the server.                                                                             // 1024
//                                                                                                                     // 1059
// Unlike the client version, this does not log you in as this user                                                    // 1060
// after creation.                                                                                                     // 1061
//                                                                                                                     // 1062
// returns userId or throws an error if it can't create                                                                // 1063
//                                                                                                                     // 1064
// XXX add another argument ("server options") that gets sent to onCreateUser,                                         // 1065
// which is always empty when called from the createUser method? eg, "admin:                                           // 1066
// true", which we want to prevent the client from setting, but which a custom                                         // 1067
// method calling Accounts.createUser could set?                                                                       // 1068
//                                                                                                                     // 1069
                                                                                                                       //
Accounts.createUser = function (options, callback) {                                                                   // 1070
  options = _.clone(options); // XXX allow an optional callback?                                                       // 1071
                                                                                                                       //
  if (callback) {                                                                                                      // 1074
    throw new Error("Accounts.createUser with callback not supported on the server yet.");                             // 1075
  }                                                                                                                    // 1076
                                                                                                                       //
  return createUser(options);                                                                                          // 1078
}; ///                                                                                                                 // 1079
/// PASSWORD-SPECIFIC INDEXES ON USERS                                                                                 // 1082
///                                                                                                                    // 1083
                                                                                                                       //
                                                                                                                       //
Meteor.users._ensureIndex('services.email.verificationTokens.token', {                                                 // 1084
  unique: 1,                                                                                                           // 1085
  sparse: 1                                                                                                            // 1085
});                                                                                                                    // 1085
                                                                                                                       //
Meteor.users._ensureIndex('services.password.reset.token', {                                                           // 1086
  unique: 1,                                                                                                           // 1087
  sparse: 1                                                                                                            // 1087
});                                                                                                                    // 1087
                                                                                                                       //
Meteor.users._ensureIndex('services.password.reset.when', {                                                            // 1088
  sparse: 1                                                                                                            // 1089
});                                                                                                                    // 1089
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}}},{"extensions":[".js",".json"]});
require("./node_modules/meteor/accounts-password/email_templates.js");
require("./node_modules/meteor/accounts-password/password_server.js");

/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-password'] = {};

})();

//# sourceMappingURL=accounts-password.js.map
