"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customValidateCreator = customValidateCreator;
var _checkTypes = require("@fab1o/check-types");
var _config = require("../config");
var _extendValidateCreator = require("./extendValidateCreator");
function customValidateCreator(type) {
  var validator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return false;
  };
  var message = arguments.length > 2 ? arguments[2] : undefined;
  for (var _len = arguments.length, expectedArgs = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    expectedArgs[_key - 3] = arguments[_key];
  }
  var isArray = type.isArray;
  function validate(value, typeChecker, loggingFunc) {
    var ErrorType = typeChecker.ErrorType,
      userArguments = typeChecker.userArguments;
    var errorMessage = typeChecker.messageBuilder.buildMessage({
      value: value,
      type: type,
      message: message,
      expectedArgs: expectedArgs
    });
    function assertValue(val) {
      var isOk = false;
      try {
        isOk = validator.apply(void 0, [val, userArguments].concat(expectedArgs));
        isOk = !!isOk;
      } catch (ex) {
        _config.Config.logger.warn('TypeChecking', ex);
      }
      if (isOk === false) {
        if (loggingFunc) {
          _config.Config.logger[loggingFunc](errorMessage);
        } else {
          throw new ErrorType(errorMessage);
        }
      }
    }
    if (isArray) {
      _checkTypes.Check.assert.array(value, errorMessage, ErrorType);
      value.forEach(function (val) {
        return assertValue(val);
      });
    } else {
      assertValue(value);
    }
  }
  return (0, _extendValidateCreator.extendValidateCreator)(validate, type);
}
