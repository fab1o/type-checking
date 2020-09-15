"use strict";

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _config = require("../config");

var _messageBuilder = require("../messageBuilder");

var _typecheck = require("./typecheck");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @access public
 * @typedef {Object} Args
 * @property {Function|Object|String} [object] - Class, instance or object name.
 * @property {Function|String} [method] - Function or method name.
 * @property {Function} validator - Custom function that returns falsy/truthy.
 * @property {String} message - Error message that describes what is expected.
 * @property {Error} [ErrorType=Config.ErrorType] - The Error type to throw.
 *
 * @param {...Args} args
 * @desc Calls a given validator function and throws an Error if it returns falsy.
 * @throws {Error} When given validator function returns falsy.
 * @example
 * typecheck.if(this, this.method, validator, message, Error);
 * typecheck.if(this, this.method, validator, message);
 * typecheck.if(this, validator, message);
 * typecheck.if(func, validator, message);
 * typecheck.if(validator, message);
 */
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
    throw SyntaxError("".concat(signature, " validator expected a Function that returns boolean."));
  }

  if (_checkTypes["default"].not.string(message)) {
    throw SyntaxError("".concat(signature, " message expected a String."));
  }

  var isOk = false;

  try {
    isOk = validator();
  } catch (ex) {
    throw SyntaxError("".concat(signature, " validator function threw an error: ").concat(ex.message));
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