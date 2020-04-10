"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;

var _checkTypes = _interopRequireDefault(require("check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var DEFAULT_ETCETERA = true;
var DEFAULT_PARENTS = true;
var DEFAULT_OPTIONAL_BRACKETS = true;
var DEFAULT_EXPECTED_MSG = 'expected';
var DEFAULT_RECEIVED_MSG = 'but received';
var DEFAULT_WITH_PROPS_MSG = 'with properties';
var DEFAULT_ERROR_TYPE = SyntaxError;

var Config = /*#__PURE__*/function () {
  function Config() {
    _classCallCheck(this, Config);
  }

  _createClass(Config, null, [{
    key: "setup",

    /**
     *
     * @param {Object} [options]
     * @param {Error} [options.errorType=SyntaxError] The Error to throw by a bad typecheck.
     * @param {Boolean} [options.etcetera=true] If message includes "...".
     * @param {Boolean} [options.parents=true] If message includes the param's parent name.
     * @param {Boolean} [options.optionalBracketsOn=true] If message includes square brackets for optional params.
     * @param {String} [options.expectedMessage='expected'] The "expected..." message part.
     * @param {String} [options.receivedMessage='but received'] The "but received..." message part.
     * @param {String} [options.withPropsMessage='with properties'] The "with properties..." message part.
     * @desc Setup config.
     *
     */
    value: function setup() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_checkTypes["default"].not.object(options)) {
        return;
      }

      if (_checkTypes["default"].assigned(options.errorType)) {
        Config.Error = options.errorType;
      }

      if (_checkTypes["default"].assigned(options.etceteraOn)) {
        Config.etceteraOn = options.etceteraOn;
      }

      if (_checkTypes["default"].assigned(options.parentsOn)) {
        Config.parentsOn = options.parentsOn;
      }

      if (_checkTypes["default"].assigned(options.optionalBracketsOn)) {
        Config.optionalBracketsOn = options.optionalBracketsOn;
      }

      if (_checkTypes["default"].assigned(options.expectedMessage)) {
        Config.expectedMessage = options.expectedMessage;
      }

      if (_checkTypes["default"].assigned(options.receivedMessage)) {
        Config.receivedMessage = options.receivedMessage;
      }

      if (_checkTypes["default"].assigned(options.withPropsMessage)) {
        Config.withPropsMessage = options.withPropsMessage;
      }
    }
    /**
     *
     * @desc Resets all config to factory default.
     *
     */

  }, {
    key: "reset",
    value: function reset() {
      _classPrivateFieldLooseBase(Config, _etceteraOn)[_etceteraOn] = DEFAULT_ETCETERA;
      _classPrivateFieldLooseBase(Config, _parentsOn)[_parentsOn] = DEFAULT_PARENTS;
      _classPrivateFieldLooseBase(Config, _optionalBracketsOn)[_optionalBracketsOn] = DEFAULT_OPTIONAL_BRACKETS;
      _classPrivateFieldLooseBase(Config, _expectedMessage)[_expectedMessage] = DEFAULT_EXPECTED_MSG;
      _classPrivateFieldLooseBase(Config, _receivedMessage)[_receivedMessage] = DEFAULT_RECEIVED_MSG;
      _classPrivateFieldLooseBase(Config, _withPropsMessage)[_withPropsMessage] = DEFAULT_WITH_PROPS_MSG;
      Config.resetErrorType();
    }
    /**
     *
     * @desc Resets all config to factory default.
     *
     */

  }, {
    key: "resetErrorType",
    value: function resetErrorType() {
      _classPrivateFieldLooseBase(Config, _errorType)[_errorType] = DEFAULT_ERROR_TYPE;
    }
  }, {
    key: "arrayOfMessage",
    // private props

    /**
     *
     * @desc The "an Array of..." message part.
     * @returns {String}
     *
     */
    get: function get() {
      return 'an Array of ';
    }
    /**
     *
     * @desc The ", ... " part in the parameters list.
     * @returns {Boolean}
     *
     */

  }, {
    key: "etceteraOn",
    get: function get() {
      return _classPrivateFieldLooseBase(Config, _etceteraOn)[_etceteraOn];
    },
    set: function set(value) {
      if (_checkTypes["default"]["boolean"](value)) {
        _classPrivateFieldLooseBase(Config, _etceteraOn)[_etceteraOn] = value;
      }
    }
    /**
     *
     * @desc Whether the param's parent name is in the errorType message.
     * @returns {Boolean}
     *
     */

  }, {
    key: "parentsOn",
    get: function get() {
      return _classPrivateFieldLooseBase(Config, _parentsOn)[_parentsOn];
    },
    set: function set(value) {
      if (_checkTypes["default"]["boolean"](value)) {
        _classPrivateFieldLooseBase(Config, _parentsOn)[_parentsOn] = value;
      }
    }
    /**
     *
     * @desc Whether message includes square brackets for optional params.
     * @returns {Boolean}
     *
     */

  }, {
    key: "optionalBracketsOn",
    get: function get() {
      return _classPrivateFieldLooseBase(Config, _optionalBracketsOn)[_optionalBracketsOn];
    },
    set: function set(value) {
      if (_checkTypes["default"]["boolean"](value)) {
        _classPrivateFieldLooseBase(Config, _optionalBracketsOn)[_optionalBracketsOn] = value;
      }
    }
    /**
     *
     * @desc The "expected..." message part.
     * @returns {String}
     *
     */

  }, {
    key: "expectedMessage",
    get: function get() {
      return _classPrivateFieldLooseBase(Config, _expectedMessage)[_expectedMessage];
    },
    set: function set(value) {
      if (_checkTypes["default"].string(value)) {
        _classPrivateFieldLooseBase(Config, _expectedMessage)[_expectedMessage] = value;
      }
    }
    /**
     *
     * @desc The "but received..." message part.
     * @returns {String}
     *
     */

  }, {
    key: "receivedMessage",
    get: function get() {
      return _classPrivateFieldLooseBase(Config, _receivedMessage)[_receivedMessage];
    },
    set: function set(value) {
      if (_checkTypes["default"].string(value)) {
        _classPrivateFieldLooseBase(Config, _receivedMessage)[_receivedMessage] = value;
      }
    }
    /**
     *
     * @desc The "with properties..." message part.
     * @returns {String}
     *
     */

  }, {
    key: "withPropsMessage",
    get: function get() {
      return _classPrivateFieldLooseBase(Config, _withPropsMessage)[_withPropsMessage];
    },
    set: function set(value) {
      if (_checkTypes["default"].string(value)) {
        _classPrivateFieldLooseBase(Config, _withPropsMessage)[_withPropsMessage] = value;
      }
    }
    /**
     *
     * @desc The Default Error type.
     * @returns {Error}
     *
     */

  }, {
    key: "DefaultError",
    get: function get() {
      return DEFAULT_ERROR_TYPE;
    }
    /**
     *
     * @desc The Error type to throw.
     * @returns {Error}
     *
     */

  }, {
    key: "Error",
    get: function get() {
      return _classPrivateFieldLooseBase(Config, _errorType)[_errorType];
    },
    set: function set(value) {
      if (_checkTypes["default"].instanceStrict(value.prototype, Error)) {
        _classPrivateFieldLooseBase(Config, _errorType)[_errorType] = value;
      }
    }
  }]);

  return Config;
}();

exports.Config = Config;

var _etceteraOn = _classPrivateFieldLooseKey("etceteraOn");

var _parentsOn = _classPrivateFieldLooseKey("parentsOn");

var _optionalBracketsOn = _classPrivateFieldLooseKey("optionalBracketsOn");

var _expectedMessage = _classPrivateFieldLooseKey("expectedMessage");

var _receivedMessage = _classPrivateFieldLooseKey("receivedMessage");

var _withPropsMessage = _classPrivateFieldLooseKey("withPropsMessage");

var _errorType = _classPrivateFieldLooseKey("errorType");

Object.defineProperty(Config, _etceteraOn, {
  writable: true,
  value: DEFAULT_ETCETERA
});
Object.defineProperty(Config, _parentsOn, {
  writable: true,
  value: DEFAULT_PARENTS
});
Object.defineProperty(Config, _optionalBracketsOn, {
  writable: true,
  value: DEFAULT_OPTIONAL_BRACKETS
});
Object.defineProperty(Config, _expectedMessage, {
  writable: true,
  value: DEFAULT_EXPECTED_MSG
});
Object.defineProperty(Config, _receivedMessage, {
  writable: true,
  value: DEFAULT_RECEIVED_MSG
});
Object.defineProperty(Config, _withPropsMessage, {
  writable: true,
  value: DEFAULT_WITH_PROPS_MSG
});
Object.defineProperty(Config, _errorType, {
  writable: true,
  value: DEFAULT_ERROR_TYPE
});