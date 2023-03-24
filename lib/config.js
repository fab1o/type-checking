"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = void 0;
var _checkTypes = require("@fab1o/check-types");
var _logger2 = require("./logger");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
      if (_checkTypes.Check.instance(value.prototype, Error)) {
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
      if (_checkTypes.Check.not.object(options)) {
        return;
      }
      if (_checkTypes.Check.assigned(options.ErrorType)) {
        Config.ErrorType = options.ErrorType;
      }
      if (_checkTypes.Check.assigned(options.logger)) {
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
