"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyValues = stringifyValues;

var _stringify = require("./stringify");

/**
 * @param {Object} obj Object.
 * @desc Stringify the Object values.
 * @returns {String}
 */
function stringifyValues(obj) {
  return Object.values(obj).map(function (v) {
    return (0, _stringify.stringify)(v);
  });
}