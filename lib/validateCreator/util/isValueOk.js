"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValueOk = isValueOk;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isValueOk(value, type) {
  for (var _len = arguments.length, expectedArgs = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    expectedArgs[_key - 2] = arguments[_key];
  }

  var assert = type.assert,
      isArray = type.isArray,
      arrayOfType = type.arrayOfType,
      validator = type.validator;
  var isOk = true;

  if (_checkTypes["default"]["function"](validator)) {
    if (isArray) {
      isOk = _checkTypes["default"].assert[arrayOfType](value);

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

    if (arrayOfType === 'nonEmptyArray') {
      isOk = _checkTypes["default"].nonEmptyArray(value);
    }

    isOk = isOk && (_Check$array$of = _checkTypes["default"].array.of)[assert].apply(_Check$array$of, [value].concat(expectedArgs));
  } else {
    isOk = _checkTypes["default"][assert].apply(_checkTypes["default"], [value].concat(expectedArgs));
  }

  return isOk;
}