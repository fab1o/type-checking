"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectValidateCreator = objectValidateCreator;
var _checkTypes = require("@fab1o/check-types");
var _checkValue = require("./util/checkValue");
var _extendValidateCreator = require("./extendValidateCreator");
function objectValidateCreator(type, objParams) {
  var isArray = type.isArray;
  var isNested = _checkTypes.Check.nonEmptyObject(objParams);
  function validate(value, typeChecker, loggingFunc) {
    var isOk = (0, _checkValue.checkValue)(value, type, typeChecker, loggingFunc);
    if (isOk && isNested) {
      var parent = typeChecker.messageBuilder.setParentParams(objParams, isArray);
      if (isArray) {
        value.forEach(function (val) {
          return typeChecker.execute({
            objParams: objParams,
            parent: parent,
            userData: val
          });
        });
      } else {
        typeChecker.execute({
          objParams: objParams,
          parent: parent,
          userData: value
        });
      }
    }
  }
  return (0, _extendValidateCreator.extendValidateCreator)(validate, type);
}
