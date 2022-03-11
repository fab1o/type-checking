"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeToString = getTypeToString;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isValid(typeName) {
  return typeName !== '' && typeName.indexOf('[object') === -1;
}

function funcToString(type) {
  var _type$prototype;

  var typeName = '';

  switch (type) {
    case Date:
    case String:
    case Number:
    case Boolean:
      typeName = type.name;
      break;

    default:
      if (_checkTypes["default"]["function"]((_type$prototype = type.prototype) === null || _type$prototype === void 0 ? void 0 : _type$prototype.toString)) {
        try {
          typeName = type.prototype.toString();
        } catch (_unused) {}
      }

  }

  if (isValid(typeName)) {
    return typeName;
  }

  return type.name || 'a Function';
}

function objToString(type) {
  var _type$constructor;

  var typeName = '';

  try {
    typeName = type.toString();
  } catch (_unused2) {}

  if (isValid(typeName)) {
    return typeName;
  }

  return ((_type$constructor = type.constructor) === null || _type$constructor === void 0 ? void 0 : _type$constructor.name) || 'an Object';
}

function getTypeToString(type, defaultVal) {
  if (_checkTypes["default"].not.assigned(type) || Number.isNaN(type)) {
    return _checkTypes["default"].string(defaultVal) ? defaultVal : String(type);
  }

  if (_checkTypes["default"].string(type)) {
    return type;
  }

  if (_checkTypes["default"]["function"](type)) {
    return funcToString(type);
  }

  return objToString(type);
}