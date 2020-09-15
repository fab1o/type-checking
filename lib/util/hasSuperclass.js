"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasSuperclass = hasSuperclass;

/**
 * @param {Object} obj An object to check.
 * @desc Checks if an obj inherits from a superclass.
 * @returns {Boolean}
 */
function hasSuperclass() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var child = obj != null ? Object.getPrototypeOf(obj) : null;
  var parent = child != null ? Object.getPrototypeOf(child) : null;
  var superclass = parent != null ? Object.getPrototypeOf(parent) : null;
  return superclass != null;
}