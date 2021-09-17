"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logValidateCreator = logValidateCreator;

var _logger = require("../logger");

var _defineProperty = require("../util/defineProperty");

function logValidateCreator(validate, props) {
  function logValidate(loggingFunc, value, typeChecker) {
    validate(value, typeChecker, loggingFunc);
  }

  var typeName = props.typeName,
      isOptional = props.isOptional,
      isNullable = props.isNullable,
      isUndefinable = props.isUndefinable;
  (0, _defineProperty.defineProperty)(validate, 'typeName', typeName);
  (0, _defineProperty.defineProperty)(validate, 'isOptional', isOptional);
  (0, _defineProperty.defineProperty)(validate, 'isNullable', isNullable);
  (0, _defineProperty.defineProperty)(validate, 'isUndefinable', isUndefinable);

  _logger.Logger.methods.forEach(function (loggingFunc) {
    (0, _defineProperty.defineProperty)(validate, loggingFunc, logValidate.bind(null, loggingFunc));
    var validateWithLog = validate[loggingFunc];
    (0, _defineProperty.defineProperty)(validateWithLog, 'isLogging', true);
    (0, _defineProperty.defineProperty)(validateWithLog, 'typeName', validate.typeName);
    (0, _defineProperty.defineProperty)(validateWithLog, 'isOptional', validate.isOptional);
    (0, _defineProperty.defineProperty)(validateWithLog, 'isNullable', validate.isNullable);
    (0, _defineProperty.defineProperty)(validateWithLog, 'isUndefinable', validate.isUndefinable);
  });

  return validate;
}