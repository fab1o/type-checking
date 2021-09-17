"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectValidateCreator = objectValidateCreator;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _checkValue = require("./util/checkValue");

var _extendValidateCreator = require("./extendValidateCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function objectValidateCreator(type, firstTypeExpectedArgs) {
  var objParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var isArray = type.isArray;

  var isNested = _checkTypes["default"].nonEmptyObject(objParams);

  function validate(value, typeChecker, loggingFunc) {
    var isOk = (0, _checkValue.checkValue)(value, type, typeChecker, loggingFunc, firstTypeExpectedArgs);

    if (isOk && isNested) {
      var parent = typeChecker.messageBuilder.setParentParams(objParams, isArray);

      if (isArray) {
        value.forEach(function (val) {
          return typeChecker.execute({
            objParams: objParams,
            parent: parent,
            input: val
          });
        });
      } else {
        typeChecker.execute({
          objParams: objParams,
          parent: parent,
          input: value
        });
      }
    }
  }

  return (0, _extendValidateCreator.extendValidateCreator)(validate, type);
}