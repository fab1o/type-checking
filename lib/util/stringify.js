"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = stringify;
var _getTypeToString = require("./getTypeToString");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var rxEscapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var meta = {
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\f': '\\f',
  '\r': '\\r',
  '"': '"',
  '\\': '\\\\'
};
function parseString(value) {
  rxEscapable.lastIndex = 0;
  if (rxEscapable.test(value)) {
    return "\"".concat(value.replace(rxEscapable, function (a) {
      var _char = meta[a];
      if (typeof _char === 'string') {
        return _char;
      }
      return "\\u".concat("0000".concat(a.charCodeAt(0).toString(16)).slice(-4));
    }), "\"");
  }
  return "\"".concat(value, "\"");
}
function stringifyArray(array) {
  var maxNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (maxNodes === -1) {
    return array.length > 0 ? '[...]' : '[]';
  }
  var i, val;
  var partial = [];
  for (i = 0; i < array.length && (maxNodes === 0 || i < maxNodes); i++) {
    var value = array[i];
    partial[i] = stringify(value, -1) || 'null';
  }
  if (partial.length === 0) {
    val = '[]';
  } else {
    val = "[".concat(partial.join(', '));
    if (maxNodes > 0 && array.length > maxNodes) {
      val += ', ...]';
    } else {
      val += ']';
    }
  }
  return val;
}
function stringifyObject(obj) {
  var maxNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (maxNodes === -1) {
    return Object.keys(obj).length > 0 ? '{...}' : '{}';
  }
  var i, val;
  var partial = [];
  var keys = Object.keys(obj);
  for (i = 0; i < keys.length && (maxNodes === 0 || i < maxNodes); i++) {
    var kk = keys[i];
    if (Object.prototype.hasOwnProperty.call(obj, kk)) {
      var value = obj[kk];
      val = stringify(value, -1);
      if (val) {
        partial.push("".concat(kk, ":").concat(val));
      }
    }
  }
  if (partial.length === 0) {
    val = '{}';
  } else {
    val = "{".concat(partial.join(', '));
    if (maxNodes > 0 && keys.length > maxNodes) {
      val += ', ...}';
    } else {
      val += '}';
    }
  }
  return val;
}
function stringify(value) {
  var _value$constructor;
  var maxNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  switch (_typeof(value)) {
    case 'string':
      return parseString(value);
    case 'boolean':
    case 'number':
    case 'undefined':
      return String(value);
    case 'function':
      return (0, _getTypeToString.getTypeToString)(value);
    case 'object':
      if (value == null) {
        return 'null';
      }
      switch ((_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name) {
        case 'Boolean':
        case 'Number':
          return String(value.valueOf());
        case 'Array':
          return stringifyArray(value, maxNodes);
        case 'Object':
          return stringifyObject(value, maxNodes);
        case 'String':
          return parseString(value.valueOf());
        default:
          if (typeof value.toJSON === 'function') {
            return parseString(value.toJSON());
          }
          if (typeof value.toString === 'function') {
            var strValue = value.toString();
            if (strValue !== '' && strValue.indexOf('[object') === -1) {
              return strValue;
            }
          }
          return stringifyObject(value, maxNodes);
      }
    default:
      return '';
  }
}