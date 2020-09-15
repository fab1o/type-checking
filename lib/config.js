"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_ETCETERA = true;
var DEFAULT_PARENTS = true;
var DEFAULT_DISPLAY_PARAM_EXT = true;
var DEFAULT_EXPECTED_MSG = 'expected';
var DEFAULT_RECEIVED_MSG = 'but received';
var DEFAULT_WITH_PROPS_MSG = 'with properties';
var DEFAULT_NAME_METHOD_PRIORITY = 'name';
var _etceteraOn = DEFAULT_ETCETERA;
var _parentsOn = DEFAULT_PARENTS;
var _displayParamExt = DEFAULT_DISPLAY_PARAM_EXT;
var _expectedMessage = DEFAULT_EXPECTED_MSG;
var _receivedMessage = DEFAULT_RECEIVED_MSG;
var _withPropsMessage = DEFAULT_WITH_PROPS_MSG;
var _nameMethodPriority = DEFAULT_NAME_METHOD_PRIORITY;
var _errorType = SyntaxError;
/**
 * @access public
 * @desc Configure TypeChecking.
 * @example
 * Config.setup({
 *   ErrorType: MyCustomError,
 *   parentsOn: false,
 *   nameMethodPriority: Config.NameMethod.toString
 * });
 */

var Config = /*#__PURE__*/function () {
  function Config() {
    _classCallCheck(this, Config);
  }

  _createClass(Config, null, [{
    key: "setup",

    /**
     * @param {Object} [options]
     * @param {Error} [options.ErrorType=SyntaxError] - The Error to throw by a bad typecheck.
     * @param {Boolean} [options.etcetera=true] - If message includes "...".
     * @param {Boolean} [options.parents=true] - If message includes the param's parent name.
     * @param {Boolean} [options.displayParamExt=true] - If message informs user it accepts null or undefined.
     * @param {String} [options.expectedMessage='expected'] - The "expected..." message part.
     * @param {String} [options.receivedMessage='but received'] - The "but received..." message part.
     * @param {String} [options.withPropsMessage='with properties'] - The "with properties..." message part.
     * @param {String} [options.nameMethodPriority=Config.NameMethod.name] - The method used as a priority to get the object name for the error message.
     * @desc Setup the config.
     */
    value: function setup() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_checkTypes["default"].not.object(options)) {
        return;
      }

      if (_checkTypes["default"].assigned(options.ErrorType)) {
        Config.ErrorType = options.ErrorType;
      }

      if (_checkTypes["default"].assigned(options.etceteraOn)) {
        Config.etceteraOn = options.etceteraOn;
      }

      if (_checkTypes["default"].assigned(options.parentsOn)) {
        Config.parentsOn = options.parentsOn;
      }

      if (_checkTypes["default"].assigned(options.displayParamExt)) {
        Config.displayParamExt = options.displayParamExt;
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

      if (_checkTypes["default"].assigned(options.nameMethodPriority)) {
        Config.nameMethodPriority = options.nameMethodPriority;
      }
    }
    /**
     * @desc Resets all config to default.
     */

  }, {
    key: "reset",
    value: function reset() {
      _etceteraOn = DEFAULT_ETCETERA;
      _parentsOn = DEFAULT_PARENTS;
      _displayParamExt = DEFAULT_DISPLAY_PARAM_EXT;
      _expectedMessage = DEFAULT_EXPECTED_MSG;
      _receivedMessage = DEFAULT_RECEIVED_MSG;
      _withPropsMessage = DEFAULT_WITH_PROPS_MSG;
      _nameMethodPriority = DEFAULT_NAME_METHOD_PRIORITY;
      Config.resetErrorType();
    }
    /**
     * @desc Resets the errorType config to default.
     */

  }, {
    key: "resetErrorType",
    value: function resetErrorType() {
      _errorType = SyntaxError;
    }
  }, {
    key: "NameMethod",

    /**
     * @enum {String}
     * @desc Enum for possible name methods.
     * @returns {String}
     */
    get: function get() {
      return {
        name: 'name',
        toString: 'toString'
      };
    }
    /**
     * @desc The "an Array of..." message part.
     * @returns {String}
     */

  }, {
    key: "arrayOfMessage",
    get: function get() {
      return 'an Array of';
    }
    /**
     * @desc The ", ... " part in the parameters list.
     * @returns {Boolean}
     */

  }, {
    key: "etceteraOn",
    get: function get() {
      return _etceteraOn;
    },
    set: function set(value) {
      if (_checkTypes["default"]["boolean"](value)) {
        _etceteraOn = value;
      }
    }
    /**
     * @desc Whether the param's parent name is in the error message.
     * @returns {Boolean}
     */

  }, {
    key: "parentsOn",
    get: function get() {
      return _parentsOn;
    },
    set: function set(value) {
      if (_checkTypes["default"]["boolean"](value)) {
        _parentsOn = value;
      }
    }
    /**
     * @desc Whether message informs user it accepts null or undefined.
     * @returns {Boolean}
     */

  }, {
    key: "displayParamExt",
    get: function get() {
      return _displayParamExt;
    },
    set: function set(value) {
      if (_checkTypes["default"]["boolean"](value)) {
        _displayParamExt = value;
      }
    }
    /**
     * @desc The "expected..." message part.
     * @returns {String}
     */

  }, {
    key: "expectedMessage",
    get: function get() {
      return _expectedMessage;
    },
    set: function set(value) {
      if (_checkTypes["default"].string(value)) {
        _expectedMessage = value;
      }
    }
    /**
     * @desc The "but received..." message part.
     * @returns {String}
     */

  }, {
    key: "receivedMessage",
    get: function get() {
      return _receivedMessage;
    },
    set: function set(value) {
      if (_checkTypes["default"].string(value)) {
        _receivedMessage = value;
      }
    }
    /**
     * @desc The method used as a priority to get the type name for the error message.
     * @returns {String}
     */

  }, {
    key: "nameMethodPriority",
    get: function get() {
      return _nameMethodPriority;
    },
    set: function set(value) {
      if (_checkTypes["default"].string(value)) {
        _nameMethodPriority = value;
      }
    }
    /**
     * @desc The "with properties..." message part.
     * @returns {String}
     */

  }, {
    key: "withPropsMessage",
    get: function get() {
      return _withPropsMessage;
    },
    set: function set(value) {
      if (_checkTypes["default"].string(value)) {
        _withPropsMessage = value;
      }
    }
    /**
     * @desc The Error type to throw.
     * @returns {Error}
     */

  }, {
    key: "ErrorType",
    get: function get() {
      return _errorType;
    },
    set: function set(value) {
      if (_checkTypes["default"].instanceStrict(value.prototype, Error)) {
        _errorType = value;
      }
    }
  }]);

  return Config;
}();

exports.Config = Config;