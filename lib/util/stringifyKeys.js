"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyKeys = stringifyKeys;

/**
 * @param {Object} obj Object.
 * @desc Stringify the Object keys.
 * @returns {String}
 */
function stringifyKeys(obj) {
  return Object.keys(obj).map(function (key) {
    return "\"".concat(key, "\"");
  });
}