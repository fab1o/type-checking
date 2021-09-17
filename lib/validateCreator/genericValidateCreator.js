"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genericValidateCreator = genericValidateCreator;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _defineProperty = require("../util/defineProperty");

var _checkValue = require("./util/checkValue");

var _extendValidateCreator = require("./extendValidateCreator");

var _logValidateCreator = require("./logValidateCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function genericValidateCreator(type, firstTypeExpectedArgs) {
  for (var _len = arguments.length, expectedArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    expectedArgs[_key - 2] = arguments[_key];
  }

  var typeName = type.name,
      isExtensible = type.isExtensible,
      isLoggable = type.isLoggable;

  function validate(value, typeChecker, loggingFunc) {
    if (_checkTypes["default"].not.assigned(typeChecker)) {
      throw TypeError("typecheck(...) params expected Types.".concat(typeName, " not Types.").concat(typeName, "()"));
    }

    _checkValue.checkValue.apply(void 0, [value, type, typeChecker, loggingFunc, firstTypeExpectedArgs].concat(expectedArgs));
  }

  if (isExtensible) {
    return _extendValidateCreator.extendValidateCreator.apply(void 0, [validate, type].concat(expectedArgs));
  }

  if (isLoggable) {
    return (0, _logValidateCreator.logValidateCreator)(validate, {
      typeName: typeName
    });
  }

  (0, _defineProperty.defineProperty)(validate, 'typeName', typeName);
  return validate;
}