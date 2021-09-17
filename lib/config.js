"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _logger2 = require("./logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_ETCETERA = true;
var DEFAULT_PARENTS = true;
var DEFAULT_DISPLAY_PARAM_EXT = true;
var DEFAULT_EXPECTED_MSG = 'expected';
var DEFAULT_RECEIVED_MSG = 'but received';
var DEFAULT_NAME_METHOD_PRIORITY = 'name';
var DEFAULT_ERROR = TypeError;
var DEFAULT_LOGGER_FUNC_FOR_OR_TYPE = 'warn';

var _etceteraOn;

var _parentsOn;

var _displayParamExt;

var _expectedMessage;

var _receivedMessage;

var _nameMethodPriority;

var _loggerMethodForOrType;

var _errorType;

var _logger;

var Config = function () {
  function Config() {
    _classCallCheck(this, Config);
  }

  _createClass(Config, null, [{
    key: "NameMethod",
    get: function get() {
      return {
        name: 'name',
        toString: 'toString'
      };
    }
  }, {
    key: "LoggerMethod",
    get: function get() {
      var obj = {};

      _logger2.Logger.methods.forEach(function (method) {
        obj[method] = method;
      });

      return obj;
    }
  }, {
    key: "DefaultError",
    get: function get() {
      return DEFAULT_ERROR;
    }
  }, {
    key: "etceteraOn",
    get: function get() {
      return _etceteraOn;
    },
    set: function set(value) {
      if (_checkTypes["default"]["boolean"](value)) {
        _etceteraOn = value;
      } else {
        throw TypeError("Config.etceteraOn expected a Boolean but received: \"".concat(value, "\""));
      }
    }
  }, {
    key: "parentsOn",
    get: function get() {
      return _parentsOn;
    },
    set: function set(value) {
      if (_checkTypes["default"]["boolean"](value)) {
        _parentsOn = value;
      } else {
        throw TypeError("Config.parentsOn expected a Boolean but received: \"".concat(value, "\""));
      }
    }
  }, {
    key: "displayParamExt",
    get: function get() {
      return _displayParamExt;
    },
    set: function set(value) {
      if (_checkTypes["default"]["boolean"](value)) {
        _displayParamExt = value;
      } else {
        throw TypeError("Config.displayParamExt expected a Boolean but received: \"".concat(value, "\""));
      }
    }
  }, {
    key: "expectedMessage",
    get: function get() {
      return _expectedMessage;
    },
    set: function set(value) {
      if (_checkTypes["default"].string(value)) {
        _expectedMessage = value;
      } else {
        throw TypeError("Config.expectedMessage expected a Boolean but received: \"".concat(value, "\""));
      }
    }
  }, {
    key: "receivedMessage",
    get: function get() {
      return _receivedMessage;
    },
    set: function set(value) {
      if (_checkTypes["default"].string(value)) {
        _receivedMessage = value;
      } else {
        throw TypeError("Config.receivedMessage expected a String but received: \"".concat(value, "\""));
      }
    }
  }, {
    key: "nameMethodPriority",
    get: function get() {
      return _nameMethodPriority;
    },
    set: function set(value) {
      if (_checkTypes["default"]["in"](value, Config.NameMethod)) {
        _nameMethodPriority = value;
      } else {
        throw TypeError("Config.nameMethodPriority expected one of ".concat(Config.NameMethod.join(), " but received: \"").concat(value, "\""));
      }
    }
  }, {
    key: "loggerMethodForOrType",
    get: function get() {
      return _loggerMethodForOrType;
    },
    set: function set(value) {
      if (value === null || _checkTypes["default"]["in"](value, Config.LoggerMethod)) {
        _loggerMethodForOrType = value;
      } else {
        throw TypeError("Config.loggerMethodForOrType expected one of ".concat(Config.LoggerMethod.join(), " or null but received: \"").concat(value, "\""));
      }
    }
  }, {
    key: "ErrorType",
    get: function get() {
      return _errorType;
    },
    set: function set(value) {
      if (_checkTypes["default"].instance(value.prototype, Error)) {
        _errorType = value;
      } else {
        throw TypeError('Config.ErrorType expected a Type that inherits from Error.');
      }
    }
  }, {
    key: "logger",
    get: function get() {
      return _logger;
    },
    set: function set(value) {
      _logger = new _logger2.Logger(value);
    }
  }, {
    key: "setup",
    value: function setup() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_checkTypes["default"].not.object(options)) {
        return;
      }

      if (_checkTypes["default"].assigned(options.ErrorType)) {
        Config.ErrorType = options.ErrorType;
      }

      if (_checkTypes["default"].assigned(options.logger)) {
        Config.logger = options.logger;
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

      if (_checkTypes["default"].assigned(options.nameMethodPriority)) {
        Config.nameMethodPriority = options.nameMethodPriority;
      }

      if (_checkTypes["default"].assigned(options.loggerMethodForOrType) || _checkTypes["default"]["null"](options.loggerMethodForOrType)) {
        Config.loggerMethodForOrType = options.loggerMethodForOrType;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      Config.etceteraOn = DEFAULT_ETCETERA;
      Config.parentsOn = DEFAULT_PARENTS;
      Config.displayParamExt = DEFAULT_DISPLAY_PARAM_EXT;
      Config.expectedMessage = DEFAULT_EXPECTED_MSG;
      Config.receivedMessage = DEFAULT_RECEIVED_MSG;
      Config.nameMethodPriority = DEFAULT_NAME_METHOD_PRIORITY;
      Config.loggerMethodForOrType = DEFAULT_LOGGER_FUNC_FOR_OR_TYPE;
      Config.resetErrorType();
      Config.resetLogger();
    }
  }, {
    key: "resetErrorType",
    value: function resetErrorType() {
      Config.ErrorType = DEFAULT_ERROR;
    }
  }, {
    key: "resetLogger",
    value: function resetLogger() {
      Config.logger = console;
    }
  }]);

  return Config;
}();

exports.Config = Config;
Config.reset();