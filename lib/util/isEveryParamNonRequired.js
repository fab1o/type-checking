"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEveryParamNonRequired = isEveryParamNonRequired;

function isEveryParamNonRequired(objParams) {
  if (objParams == null) {
    return false;
  }

  return Object.keys(objParams).every(function (name) {
    var paramValidate = objParams[name];
    return paramValidate && (paramValidate.isOptional || paramValidate.isUndefinable);
  });
}