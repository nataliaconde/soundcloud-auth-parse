// Helper functions for accessing the Soundcloud API.
var Parse = require('parse/node').Parse;
const httpsRequest = require('./httpsRequest');

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData) {
  return soundcloudRequest('/me?oauth_token=' + authData.access_token).then( response => {
    
    if (data && (response.id == authData.id)) {
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
function soundcloudRequest(path) {
  return httpsRequest.post('https://api.soundcloud.com/' + path);
}



module.exports = {
  //validateAppId: validateAppId,
  validateAuthData: validateAuthData
};