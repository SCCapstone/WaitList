(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var _ = Package.underscore._;

/* Package-scope variables */
var Helpers;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/raix_handlebar-helpers/common.js                                                                         //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
// Helper scope
if (typeof Helpers === 'undefined') {
  Helpers = {};
}

var languageText = {};

// expects an array: languageText['say.hello.to.me']['en'] = 'Say hello to me:)';
// ex.:
// getText('Say.Hello.To.Me') == 'say hello to me:)'; // lowercase
// getText('SAY.HELLO.TO.ME') == 'SAY HELLO TO ME:)'; // uppercase
// getText('Say.hello.to.me') == 'Say hello to me:)'; // uppercase first letter, rest lowercase
// getText('Say.Hello.To.Me') == 'Say Hello To Me:)'; // camelCase
// getText('SAy.hello.to.me') == 'Say hello To me:)'; // ignore case sensitivity

var _languageDeps = (Meteor.isClient) ? new Deps.Dependency() : null;
var currentLanguage = 'en';

// language = 'en'
Helpers.setLanguage = function (language) {
  if (language && language !== currentLanguage) {
    currentLanguage = language;
    if (Meteor.isClient) _languageDeps.changed();
  }
};

Helpers.language = function () {
  if (Meteor.isClient) _languageDeps.depend();
  return currentLanguage;
};

Helpers.setDictionary = function(dict) {
  languageText = dict;
};

Helpers.addDictionary = function(dict) {
  _.extend(languageText, dict);
};

// handleCase will mimic text Case making src same case as text
var handleCase = function (text, src) {
  // Return lowercase
  if (text == text.toLowerCase())
    return src.toLowerCase();
  // Return uppercase
  if (text == text.toUpperCase())
    return src.toUpperCase();
  // Return uppercase first letter, rest lowercase
  if (text.substr(1) == text.substr(1).toLowerCase())
    return src.substr(0, 1).toUpperCase() + src.substr(1).toLowerCase();
  // Return src withour changes
  if (text.substr(0, 2) == text.substr(0, 2).toUpperCase())
    return src;
  // Return CamelCase
  return src.replace(/( [a-z])/g, function ($1) {
    return $1.toUpperCase();
  });
};

/**
 *
 * @param {string} text
 * @param {string} [lang]
 * @return {string}
 */
Helpers.getText = function (text, lang) {
  var txt = text.toLowerCase();
  var langText = languageText && languageText[txt];
  var langKey = (typeof lang === 'string') ? lang : Helpers.language();
  return handleCase(text, (langText) ? ( (langText[langKey]) ? langText[langKey] : langText.en) : '[' + text + ']');
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
(function (pkg, symbols) {
  for (var s in symbols)
    (s in pkg) || (pkg[s] = symbols[s]);
})(Package['raix:handlebar-helpers'] = {}, {
  Helpers: Helpers
});

})();
