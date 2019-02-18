'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Helper functions for accessing the SoundCloud API.
var Parse = require('parse/node').Parse;
var axios = require('axios');

var defaultValidator = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id, token) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return soundcloudRequest('me?oauth_token=' + token);

          case 3:
            response = _context.sent;

            if (!(response && response.status == 200 && response.data && response.data.id == id)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return');

          case 8:
            throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Soundcloud auth is invalid for this user.');

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](0);
            throw new Parse.Error(Parse.Error.OBJECT_NOT_FOUND, 'Soundcloud auth is invalid for this user.');

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 11]]);
  }));

  return function defaultValidator(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var validateIdToken = defaultValidator;

var validateAuthToken = defaultValidator;

var validateAuthData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(authData) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!authData.id_token) {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return validateIdToken(authData.id, authData.id_token);

          case 4:
            return _context2.abrupt('return', _context2.sent);

          case 7:
            _context2.next = 9;
            return validateAuthToken(authData.id, authData.access_token);

          case 9:
            return _context2.abrupt('return', _context2.sent);

          case 10:
            _context2.next = 17;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](0);
            _context2.next = 16;
            return validateIdToken(authData.id, authData.access_token);

          case 16:
            return _context2.abrupt('return', _context2.sent);

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 12]]);
  }));

  return function validateAuthData(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var validateAppId = function validateAppId() {
  return Promise.resolve();
};

// Send a request to Sound Cloud to validate credentials
var soundcloudRequest = function soundcloudRequest(path) {
  return axios.get('https://api.soundcloud.com/' + path);
};

module.exports = {
  validateAppId: validateAppId,
  validateAuthData: validateAuthData
};