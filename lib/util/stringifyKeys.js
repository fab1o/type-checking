"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyKeys = stringifyKeys;

function stringifyKeys(obj) {
  return Object.keys(obj).map(function (key) {
    return "\"".concat(key, "\"");
  });
}