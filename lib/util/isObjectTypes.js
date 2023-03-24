"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObjectTypes = isObjectTypes;
var _checkTypes = require("@fab1o/check-types");
function isObjectTypes(params) {
  if (_checkTypes.Check.nonEmptyObject(params)) {
    return Object.values(params).every(function (value) {
      return _checkTypes.Check["function"](value) && _checkTypes.Check.string(value.typeName);
    });
  }
  return false;
}
