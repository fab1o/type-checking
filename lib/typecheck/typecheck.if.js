"use strict";

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _config = require("../config");

var _messageBuilder = require("../messageBuilder");

var _typecheck = require("./typecheck");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_typecheck.typecheck["if"] = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _composeOverloading = (0, _util.composeOverloading)(args, 'typecheck.if'),
      signature = _composeOverloading.signature,
      object = _composeOverloading.object,
      method = _composeOverloading.method,
      validator = _composeOverloading.c,
      message = _composeOverloading.d,
      _composeOverloading$E = _composeOverloading.ErrorType,
      ErrorType = _composeOverloading$E === void 0 ? _config.Config.ErrorType : _composeOverloading$E;

  if (_checkTypes["default"].not["function"](validator)) {
    throw TypeError("".concat(signature, " validator expected a Function that returns boolean."));
  }

  if (_checkTypes["default"].not.string(message)) {
    throw TypeError("".concat(signature, " message expected a String."));
  }

  var isOk = false;

  try {
    isOk = validator();
  } catch (ex) {
    throw TypeError("".concat(signature, " validator function threw an error: ").concat(ex.message));
  }

  if (isOk === false) {
    var methodSignature = new _messageBuilder.MethodSignature({
      object: object,
      method: method
    });
    var messageBuilder = new _messageBuilder.MessageBuilder(methodSignature);
    var errorMessage = messageBuilder.buildCustomMessage(message);
    throw new ErrorType(errorMessage);
  }
};