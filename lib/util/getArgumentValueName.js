"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArgumentValueName = getArgumentValueName;

var _getValueName = require("./getValueName");

/**
 * Reflection library - getArgumentValueName
 *
 * Use this function for:
 *   - arguments in Types
 */

/**
 * @param {*} value Any value.
 * @desc Gets the value name as a String.
 * @returns {String}
 */
function getArgumentValueName(value) {
  return (0, _getValueName.getValueName)(value, {
    includeTypeName: false
  });
}