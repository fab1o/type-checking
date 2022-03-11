"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logValidateCreator = logValidateCreator;

var _defineProperty = require("../util/defineProperty");

function logValidateCreator(validate, props) {
  function logValidate(value, typeChecker) {
    validate(value, typeChecker, 'warn');
  }

  var typeName = props.typeName,
      isOptional = props.isOptional;
  (0, _defineProperty.defineProperty)(validate, 'warn', logValidate);
  (0, _defineProperty.defineProperty)(validate.warn, 'isLogging', true);
  (0, _defineProperty.defineProperty)(validate.warn, 'typeName', typeName);
  (0, _defineProperty.defineProperty)(validate.warn, 'isOptional', isOptional);
  (0, _defineProperty.defineProperty)(validate, 'typeName', typeName);
  (0, _defineProperty.defineProperty)(validate, 'isOptional', isOptional);
  return validate;
}