"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = void 0;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Logger = function Logger(logger) {
  var _this = this;

  _classCallCheck(this, Logger);

  var log = function log(method) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (_checkTypes["default"]["function"](logger[method])) {
      logger[method].apply(logger, args);
    } else {
      var _console;

      (_console = console)[method].apply(_console, args);
    }
  };

  Logger.methods.forEach(function (method) {
    if (_checkTypes["default"].not.assigned(logger) || _checkTypes["default"].not["function"](logger[method])) {
      console.warn("Provided logger is missing the expected \"".concat(method, "\" function, falling back to console."));
    }

    _this[method] = log.bind(null, method);
  });
};

exports.Logger = Logger;

_defineProperty(Logger, "methods", ['log', 'info', 'warn', 'error']);