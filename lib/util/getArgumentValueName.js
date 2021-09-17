"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArgumentValueName = getArgumentValueName;

var _getValueName = require("./getValueName");

function getArgumentValueName(value) {
  return (0, _getValueName.getValueName)(value, {
    includeTypeName: false
  });
}