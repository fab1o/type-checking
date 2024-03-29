"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeName = getTypeName;
var _checkTypes = require("@fab1o/check-types");
var _getTypeToString = require("./getTypeToString");
function funcName(type) {
  return type.name || (0, _getTypeToString.getTypeToString)(type);
}
function objName(type) {
  var _type$constructor;
  return ((_type$constructor = type.constructor) === null || _type$constructor === void 0 ? void 0 : _type$constructor.name) || (0, _getTypeToString.getTypeToString)(type);
}
function getTypeName(type, defaultVal) {
  if (_checkTypes.Check.not.assigned(type) || Number.isNaN(type)) {
    return _checkTypes.Check.string(defaultVal) ? defaultVal : String(type);
  }
  if (_checkTypes.Check["function"](type)) {
    return funcName(type);
  }
  return objName(type);
}
