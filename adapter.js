// Helper functions for accessing the Soundcloud API.
var OAuth = require('./OAuth1Client');
var Parse = require('parse/node').Parse;
const httpsRequest = require('./httpsRequest');

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData) {
  return requestSoundcloud('/connect').then(
    response => {
      var client = new OAuth(options);
      client.client_id = authData.client_id;
      client.client_secret = authData.client_secret;
      client.redirect_uri = authData.redirect_uri;
      client.grant_type = authData.grant_type;

      return client.post('/oauth2/token').then(data => {
        if (data && data.id_str == '' + authData.id) {
          return;
        }
        throw new Parse.Error(
          Parse.Error.OBJECT_NOT_FOUND,
          'Twitter auth is invalid for this user.'
        );
      });

      if (response && response.data && response.data.id == authData.id) {
        return;
      }
      throw new Parse.Error(
        Parse.Error.OBJECT_NOT_FOUND,
        'Soundcloud auth is invalid for this user.'
      );
    }
  );
}

// Returns a promise that fulfills iff this app id is valid.
function validateAppId() {
  return Promise.resolve();
}

// A promisey wrapper for api requests
function request(path) {
  return httpsRequest.get('https://api.soundcloud.com/' + path);
}

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData,
};