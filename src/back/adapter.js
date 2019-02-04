// Helper functions for accessing the SoundCloud API.
const Parse = require('parse/node').Parse;
const axios = require('axios')

const defaultValidator = async (id, token) => {
  try {
    let response = await soundcloudRequest('me?oauth_token=' + token)
    if (response && response.status == 200 && response.data && response.data.id == id) return;
    else throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      'Soundcloud auth is invalid for this user.'
    );
  } catch(err) {
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      'Soundcloud auth is invalid for this user.'
    );
  }
}

const validateIdToken = defaultValidator

const validateAuthToken = defaultValidator

const validateAuthData = async authData => {
  try {
    if (authData.id_token) return await validateIdToken(authData.id, authData.id_token);
    else return await validateAuthToken(authData.id, authData.access_token)
  } catch (err) {
    // Try with the id_token param
    return await validateIdToken(authData.id, authData.access_token);
  }
}

const validateAppId = () => Promise.resolve()

// Send a request to Sound Cloud to validate credentials
const soundcloudRequest = path => axios.get('https://api.soundcloud.com/' + path)

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData
};
