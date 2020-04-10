"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inheritance = inheritance;

var _checkTypes = _interopRequireDefault(require("check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {*} type Type to check.
 * @param {*} superType Super or parent type.
 * @desc Checks if a given type inherits from another type.
 * @returns {Boolean}
 *
 */
function inheritance(type, superType) {
  return _checkTypes["default"].assigned(type) && type.prototype instanceof superType;
}