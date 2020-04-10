"use strict";

var _checkTypes = require("check-types");

var _config = require("../config");

var _messageBuilder = require("../messageBuilder");

var _util = require("./util");

var _typecheck = require("./typecheck");

/**
 *
 * @param {Object} [object] Class instance or object.
 * @param {Function} [method] Function or method.
 * @param {Function} [customValidator=() => false] Custom function that returns falsy/truthy.
 * @param {String} [customMessage=''] Error message that describes what is expected.
 * @param {Error} [ErrorType=Config.Error] The Error type to throw.
 * @desc Calls a custom validator function and throws an Error if it returns falsy. This is the
 * equilavent of Check.assert but for functions.
 * @throws {Error} When typechecking fails.
 * @example
 * typecheck.if(this, this.method, customValidator, customMessage, Error);
 *
 * typecheck.if(this, this.method, customValidator, customMessage);
 *
 * typecheck.if(this, customValidator, customMessage);
 *
 * typecheck.if(func, customValidator, customMessage);
 *
 * typecheck.if(customValidator, customMessage);
 *
 */
_typecheck.typecheck["if"] = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _composeOverloading = (0, _util.composeOverloading)(args),
      signature = _composeOverloading.signature,
      object = _composeOverloading.a,
      method = _composeOverloading.b,
      customValidator = _composeOverloading.c,
      customMessage = _composeOverloading.d,
      _composeOverloading$e = _composeOverloading.e,
      ErrorType = _composeOverloading$e === void 0 ? _config.Config.Error : _composeOverloading$e;

  _checkTypes.assert["function"](customValidator, "".concat(signature, " customValidator ").concat(_config.Config.expectedMessage, " a Function."), _config.Config.DefaultError);

  _checkTypes.assert.string(customMessage, "".concat(signature, " customMessage ").concat(_config.Config.expectedMessage, " a String."), _config.Config.DefaultError);

  var methodSignature = new _messageBuilder.MethodSignature({
    object: object,
    method: method
  });
  var messageBuilder = new _messageBuilder.MessageBuilder(methodSignature);
  var errorMessage = messageBuilder.buildCustomMessage(customMessage);
  var isOk = false;

  try {
    isOk = customValidator();
  } catch (ex) {
    throw new _config.Config.DefaultError("".concat(signature, " Your custom validator function threw an error: ").concat(ex.message));
  }

  (0, _checkTypes.assert)(isOk, errorMessage, ErrorType);
};