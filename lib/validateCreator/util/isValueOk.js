"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValueOk = isValueOk;
var _checkTypes = require("@fab1o/check-types");
function isValueOk(value, type) {
  for (var _len = arguments.length, expectedArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    expectedArgs[_key - 2] = arguments[_key];
  }
  var assert = type.assert,
    isArray = type.isArray,
    validator = type.validator;
  var isOk = true;
  if (_checkTypes.Check["function"](validator)) {
    if (isArray) {
      isOk = _checkTypes.Check.assert.array(value);
      if (isOk) {
        value.forEach(function (val) {
          isOk = isOk && validator.apply(void 0, [val].concat(expectedArgs));
        });
      }
    } else {
      isOk = validator.apply(void 0, [value].concat(expectedArgs));
    }
    return isOk;
  }
  if (isArray) {
    var _Check$array$of;
    isOk = isOk && (_Check$array$of = _checkTypes.Check.array.of)[assert].apply(_Check$array$of, [value].concat(expectedArgs));
  } else {
    isOk = _checkTypes.Check[assert].apply(_checkTypes.Check, [value].concat(expectedArgs));
  }
  return isOk;
}
