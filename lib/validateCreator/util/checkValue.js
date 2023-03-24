"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkValue = checkValue;
var _config = require("../../config");
var _isValueOk = require("./isValueOk");
function checkValue(value, type, typeChecker, loggingFunc) {
  var messageBuilder = typeChecker.messageBuilder,
    ErrorType = typeChecker.ErrorType;
  var funcToLog = loggingFunc || typeChecker.loggingFunc;
  for (var _len = arguments.length, expectedArgs = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    expectedArgs[_key - 4] = arguments[_key];
  }
  var isOk = _isValueOk.isValueOk.apply(void 0, [value, type].concat(expectedArgs));
  if (isOk === false) {
    var errorMessage = messageBuilder.buildMessage({
      value: value,
      type: type,
      expectedArgs: expectedArgs
    });
    if (funcToLog) {
      _config.Config.logger[funcToLog](errorMessage);
    } else {
      throw new ErrorType(errorMessage);
    }
  }
  return isOk;
}