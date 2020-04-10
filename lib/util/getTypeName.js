"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeName = getTypeName;

var _checkTypes = _interopRequireDefault(require("check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {*} type Type.
 * @desc Gets the type name: Function, Object or Class name.
 * @returns {String}
 *
 */
function getTypeName(type) {
  if (_checkTypes["default"].not.assigned(type)) {
    return "".concat(type);
  }

  var typeName;

  if (_checkTypes["default"]["function"](type)) {
    typeName = type.prototype.toString();

    if (typeName === '[object Object]') {
      typeName = type.name;
    }
  } else {
    typeName = type.toString(); // object and class toString
  }

  if (typeName === '[object Object]' || typeName === '[object Array]') {
    if (_checkTypes["default"]["function"](type.constructor)) {
      typeName = type.constructor.name;
    }

    if (typeName === '[object Object]' || typeName === '[object Array]' || typeName === 'Object') {
      typeName = 'an Object';
    }
  }

  return typeName;
}