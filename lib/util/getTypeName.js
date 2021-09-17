"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeName = getTypeName;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MAX_LEN = 128;
var NOT_OVERRIDDEN = '[object ';

function toString(type) {
  return _checkTypes["default"]["function"](type) ? funcToString(type) : objToString(type);
}

function name(type) {
  return _checkTypes["default"]["function"](type) ? funcName(type) : objName(type);
}

function funcToString(type) {
  var typeName = '';

  if (type.prototype && type.prototype.toString) {
    typeName = type.prototype.toString() || '';
  }

  if (typeName === '' || typeName.indexOf(NOT_OVERRIDDEN) !== -1 || typeName.length > MAX_LEN) {
    typeName = type.name;
  }

  return typeName || '';
}

function funcName(type) {
  return type.name || funcToString(type);
}

function objToString(type) {
  var typeName = type.toString() || '';

  if (typeName === '' || typeName.indexOf(NOT_OVERRIDDEN) !== -1 || typeName.length > MAX_LEN) {
    if (_checkTypes["default"]["function"](type.constructor)) {
      typeName = type.constructor.name;
    } else {
      typeName = null;
    }
  }

  return typeName || 'Object';
}

function objName(type) {
  var typeName = null;

  if (_checkTypes["default"]["function"](type.constructor)) {
    typeName = type.constructor.name;
  }

  return typeName || objToString(type);
}

function getTypeName(type, defaultVal) {
  if (_checkTypes["default"].not.assigned(type) || Number.isNaN(type)) {
    return _checkTypes["default"].string(defaultVal) ? defaultVal : String(type);
  }

  if (_checkTypes["default"].string(type)) {
    return type;
  }

  if (_config.Config.nameMethodPriority === _config.Config.NameMethod.toString) {
    return toString(type);
  }

  return name(type);
}