"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyValues = stringifyValues;

var _stringify = require("./stringify");

function stringifyValues(obj) {
  return Object.values(obj).map(function (v) {
    return (0, _stringify.stringify)(v);
  });
}