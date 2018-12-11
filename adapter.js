// Helper functions for accessing the Soundcloud API.
var Parse = require('parse/node').Parse;
const httpsRequest = require('./httpsRequest');

//validateToken

function validateIdToken(id, token) { 
  return soundcloudRequest('me?oauth_token=' + token).then(response => { 
    if (response && response.id == id) { 
      return; 
    } 
    throw new Parse.Error( 
      Parse.Error.OBJECT_NOT_FOUND, 
      'Soundcloud auth is invalid for this user.' 
    ); 
  }); 
}

//AuthToken 

function validateAuthToken(id, token) { 
  return soundcloudRequest('me?oauth_token=' + token).then(response => { 
    if (response && response.id == id) { 
      return; 
    } 
    throw new Parse.Error( 
      Parse.Error.OBJECT_NOT_FOUND, 
      'Soundcloud auth is invalid for this user.' 
    ); 
  }); 
}

// Returns a promise that fulfills iff this user id is valid.
function validateAuthData(authData) {
  if (authData.id_token) { 
    return validateIdToken(authData.id, authData.id_token); 
  } else { 
    return validateAuthToken(authData.id, authData.access_token).then( 
      () => { 
        // Validation with auth token worked 
        return; 
      }, 
      () => { 
      // Try with the id_token param 
        return validateIdToken(authData.id, authData.access_token); 
      } 
    ); 
  } 
}

// Returns a promise that fulfills iff this app id is valid.
function validateAppId() {
  return Promise.resolve();
}

// A promisey wrapper for api requests
function soundcloudRequest(path) {
  return httpsRequest.get('https://api.soundcloud.com/' + path);
}



module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData
};