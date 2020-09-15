"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEveryParamNonRequired = isEveryParamNonRequired;

/**
 * @param {Object<TypeChecking.Type>} [objParams] - Params built with Types.
 * @desc Whether every parameter is non-required (either Optional or Undefinable).
 * @returns {Boolean}
 *
 */
function isEveryParamNonRequired(objParams) {
  if (objParams == null) {
    return false;
  }

  return Object.keys(objParams).every(function (name) {
    var paramValidate = objParams[name];
    return paramValidate && (paramValidate.isOptional || paramValidate.isUndefinable);
  });
}