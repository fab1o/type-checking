"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _logger2 = require("./logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var DEFAULT_ERROR = TypeError;

var _errorType;

var _logger;

var Config = function () {
  function Config() {
    _classCallCheck(this, Config);
  }

  _createClass(Config, null, [{
    key: "DefaultError",
    get: function get() {
      return DEFAULT_ERROR;
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
    }
  }, {
    key: "reset",
    value: function reset() {
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