"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateArguments = validateArguments;

var _config = require("../../config");

var _messageBuilder = require("../../messageBuilder");

var _util = require("../../util");

var _composeOverloading2 = require("./composeOverloading");

function validateArguments(args, methodName) {
  var _composeOverloading = (0, _composeOverloading2.composeOverloading)(args, methodName),
      signature = _composeOverloading.signature,
      object = _composeOverloading.object,
      method = _composeOverloading.method,
      objParams = _composeOverloading.c,
      input = _composeOverloading.d,
      _composeOverloading$E = _composeOverloading.ErrorType,
      ErrorType = _composeOverloading$E === void 0 ? _config.Config.ErrorType : _composeOverloading$E;

  if ((0, _util.isObjectTypes)(objParams) === false) {
    throw TypeError("".concat(signature, " params expected an Object built with Types."));
  }

  var inputType = (0, _util.getUserInputType)(input);

  if (inputType === _util.UserInputType.none) {
    throw TypeError("".concat(signature, " arguments expected an Array or an Object. Make sure you invoke typecheck correctly."));
  }

  var displayBrackets = inputType === _util.UserInputType.object;
  var methodSignature = new _messageBuilder.MethodSignature({
    object: object,
    method: method,
    objParams: objParams,
    displayBrackets: displayBrackets
  });
  var messageBuilder = new _messageBuilder.MessageBuilder(methodSignature);
  return {
    signature: signature,
    messageBuilder: messageBuilder,
    objParams: objParams,
    input: input,
    ErrorType: ErrorType
  };
}