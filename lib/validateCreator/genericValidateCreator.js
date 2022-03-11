"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genericValidateCreator = genericValidateCreator;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _checkValue = require("./util/checkValue");

var _extendValidateCreator = require("./extendValidateCreator");

var _logValidateCreator = require("./logValidateCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function genericValidateCreator(type) {
  for (var _len = arguments.length, expectedArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    expectedArgs[_key - 1] = arguments[_key];
  }

  var typeName = type.name,
      isExtensible = type.isExtensible;

  function validate(value, typeChecker, loggingFunc) {
    if (_checkTypes["default"].not.assigned(typeChecker)) {
      throw TypeError("typecheck(...) params expected Types.".concat(typeName, " not Types.").concat(typeName, "()"));
    }

    _checkValue.checkValue.apply(void 0, [value, type, typeChecker, loggingFunc].concat(expectedArgs));
  }

  if (isExtensible) {
    return (0, _extendValidateCreator.extendValidateCreator)(validate, type);
  }

  return (0, _logValidateCreator.logValidateCreator)(validate, {
    typeName: typeName
  });
}