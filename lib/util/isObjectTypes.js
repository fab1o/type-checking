"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObjectTypes = isObjectTypes;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isObjectTypes(params) {
  if (_checkTypes["default"].nonEmptyObject(params)) {
    return Object.values(params).every(function (value) {
      return _checkTypes["default"]["function"](value) && _checkTypes["default"].string(value.typeName);
    });
  }

  return false;
}