"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipValidateCreator = skipValidateCreator;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _defineProperty = require("../util/defineProperty");

var _config = require("../config");

var _logValidateCreator = require("./logValidateCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function skipValidateCreator(type) {
  var typeName = type.name,
      isLoggable = type.isLoggable;

  function validate(value, typeChecker, loggingFunc) {
    if (_checkTypes["default"].not.assigned(typeChecker)) {
      throw TypeError('typecheck(...) params expected Types.skip not Types.skip()');
    }

    var messageBuilder = typeChecker.messageBuilder;

    if (loggingFunc) {
      var errorMessage = messageBuilder.buildMessage({
        value: value,
        type: type
      });

      _config.Config.logger[loggingFunc](errorMessage);
    }
  }

  if (isLoggable) {
    return (0, _logValidateCreator.logValidateCreator)(validate, {
      typeName: typeName
    });
  }

  (0, _defineProperty.defineProperty)(validate, 'typeName', typeName);
  return validate;
}