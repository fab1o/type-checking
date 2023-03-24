"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendValidateCreator = extendValidateCreator;
var _checkTypes = require("@fab1o/check-types");
var _defineProperty = require("../util/defineProperty");
var _logValidateCreator = require("./logValidateCreator");
function extendValidateCreator(validate, type) {
  var typeName = type.name;
  function optionalValidate(value, input, typeChecker, loggingFunc) {
    if (_checkTypes.Check.not.assigned(value)) {
      return;
    }
    validate(value, input, typeChecker, loggingFunc);
  }
  validate = (0, _logValidateCreator.logValidateCreator)(validate, {
    typeName: typeName
  });
  (0, _defineProperty.defineProperty)(validate, 'optional', (0, _logValidateCreator.logValidateCreator)(optionalValidate, {
    typeName: typeName,
    isOptional: true
  }));
  return validate;
}
