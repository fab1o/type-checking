"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyRegExp = stringifyRegExp;
function stringifyRegExp(regExp) {
  return regExp.source;
}