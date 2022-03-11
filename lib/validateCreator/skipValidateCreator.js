"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipValidateCreator = skipValidateCreator;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _config = require("../config");

var _logValidateCreator = require("./logValidateCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function skipValidateCreator(type) {
  var typeName = type.name;

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

  return (0, _logValidateCreator.logValidateCreator)(validate, {
    typeName: typeName
  });
}