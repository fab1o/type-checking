"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customValidateCreator = customValidateCreator;

var _checkTypes = require("@dss/check-types");

var _config = require("../config");

var _extendValidateCreator = require("./extendValidateCreator");

function customValidateCreator(type, firstTypeExpectedArgs) {
  var validator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return false;
  };
  var message = arguments.length > 3 ? arguments[3] : undefined;

  for (var _len = arguments.length, expectedArgs = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    expectedArgs[_key - 4] = arguments[_key];
  }

  var isArray = type.isArray,
      arrayOfType = type.arrayOfType;

  function validate(value, typeChecker, loggingFunc) {
    var ErrorType = typeChecker.ErrorType;
    var errorMessage = typeChecker.messageBuilder.buildMessage({
      value: value,
      type: type,
      message: message,
      expectedArgs: expectedArgs
    });

    function assertValue(val) {
      var isOk = false;

      try {
        isOk = validator.apply(void 0, [val].concat(expectedArgs));
        isOk = !!isOk;
      } catch (ex) {
        _config.Config.logger.log('TypeChecking', ex);
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
      _checkTypes.assert[arrayOfType](value, errorMessage, ErrorType);

      value.forEach(function (val) {
        return assertValue(val);
      });
    } else {
      assertValue(value);
    }
  }

  return (0, _extendValidateCreator.extendValidateCreator)(validate, type);
}