"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueName = getValueName;

var _checkTypes = _interopRequireDefault(require("check-types"));

var _util = require("../../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {*} type Type.
 * @param {Boolean} [useStrigify=false] Whether it should use JSON.strigify for objects.
 * @desc Gets the type name as a String, ie: string, array, function, object or class instance.
 * @returns {String}
 *
 */
function getValueName(type) {
  var useStrigify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (_checkTypes["default"].not.assigned(type)) {
    return "".concat(type);
  }

  if (_checkTypes["default"].string(type)) {
    return "a String: \"".concat(type, "\"");
  }

  if (_checkTypes["default"].number(type)) {
    return "a Number: ".concat(type);
  }

  if (_checkTypes["default"]["boolean"](type)) {
    return "a Boolean: ".concat(type);
  }

  if (_checkTypes["default"].array(type)) {
    return "an Array: ".concat((0, _util.stringify)(type, 2));
  }

  var typeName;

  if (_checkTypes["default"]["function"](type)) {
    typeName = "".concat(type.prototype);

    if (typeName === '[object Object]') {
      typeName = type.name;
    }
  } else {
    typeName = "".concat(type);
  }

  if (typeName === '[object Object]' || typeName === '[object Array]') {
    if (_checkTypes["default"]["function"](type.constructor)) {
      typeName = type.constructor.name;
    }

    if (typeName === '[object Object]' || typeName === '[object Array]' || typeName === 'Object') {
      if (useStrigify) {
        typeName = "an Object: ".concat((0, _util.stringify)(type, 2));
      } else {
        typeName = 'an Object';
      }
    }
  }

  return typeName;
}