"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendValidateCreator = extendValidateCreator;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _defineProperty = require("../util/defineProperty");

var _createValidators = require("./util/createValidators");

var _logValidateCreator = require("./logValidateCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function extendValidateCreator(validate, type) {
  var typeName = type.name,
      isLoggable = type.isLoggable;

  function optionalValidate(value, input, typeChecker, loggingFunc) {
    if (_checkTypes["default"].not.assigned(value)) {
      return;
    }

    validate(value, input, typeChecker, loggingFunc);
  }

  function nullableValidate(value, input, typeChecker, loggingFunc) {
    if (_checkTypes["default"]["null"](value)) {
      return;
    }

    validate(value, input, typeChecker, loggingFunc);
  }

  function undefinableValidate(value, input, typeChecker, loggingFunc) {
    if (_checkTypes["default"].undefined(value)) {
      return;
    }

    validate(value, input, typeChecker, loggingFunc);
  }

  if (isLoggable) {
    validate = (0, _logValidateCreator.logValidateCreator)(validate, {
      typeName: typeName
    });
  }

  (0, _defineProperty.defineProperty)(validate, 'optional', (0, _logValidateCreator.logValidateCreator)(optionalValidate, {
    typeName: typeName,
    isOptional: true
  }));
  (0, _defineProperty.defineProperty)(validate, 'nullable', (0, _logValidateCreator.logValidateCreator)(nullableValidate, {
    typeName: typeName,
    isNullable: true
  }));
  (0, _defineProperty.defineProperty)(validate, 'undefinable', (0, _logValidateCreator.logValidateCreator)(undefinableValidate, {
    typeName: typeName,
    isUndefinable: true
  }));

  for (var _len = arguments.length, expectedArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    expectedArgs[_key - 2] = arguments[_key];
  }

  if (type.or.asserts) {
    (0, _defineProperty.defineProperty)(validate, 'or', (0, _createValidators.createValidators)(type, 'or', expectedArgs));
  }

  if (type.and.asserts) {
    (0, _defineProperty.defineProperty)(validate, 'and', (0, _createValidators.createValidators)(type, 'and', expectedArgs));
  }

  return validate;
}