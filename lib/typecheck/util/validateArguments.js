"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateArguments = validateArguments;
var _messageBuilder = require("../../messageBuilder");
var _util = require("../../util");
var _composeOverloading2 = require("./composeOverloading");
function validateArguments(args, methodName) {
  var _composeOverloading = (0, _composeOverloading2.composeOverloading)(args, methodName),
    signature = _composeOverloading.signature,
    object = _composeOverloading.object,
    method = _composeOverloading.method,
    objParams = _composeOverloading.c,
    userArguments = _composeOverloading.d,
    ErrorType = _composeOverloading.ErrorType;
  var inputType = (0, _util.getUserArgumentsType)(userArguments);
  if (inputType === _util.UserArgumentsType.none) {
    throw TypeError("".concat(signature, " arguments expected an Array or an Object. Make sure you invoke typecheck correctly."));
  }
  var displayBrackets = inputType === _util.UserArgumentsType.object;
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
    userArguments: userArguments,
    ErrorType: ErrorType
  };
}