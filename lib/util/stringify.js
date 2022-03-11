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

function objectify(value, maxNodes) {
  if (maxNodes === -1) {
    if (Array.isArray(value)) {
      return value.length > 0 ? '[...]' : '[]';
    }

    return Object.keys(value).length > 0 ? '{...}' : '{}';
  }

  var i, val, length;
  var partial = [];

  if (Array.isArray(value)) {
    length = value.length;

    for (i = 0; i < length && (maxNodes === 0 || i < maxNodes); i++) {
      partial[i] = str(i, value, -1) || 'null';
    }

    if (partial.length === 0) {
      val = '[]';
    } else {
      val = "[".concat(partial.join(', '));

      if (maxNodes > 0 && length > maxNodes) {
        val += ', ...]';
      } else {
        val += ']';
      }
    }

    return val;
  }

  var keys = Object.keys(value);
  length = keys.length;

  for (i = 0; i < length && (maxNodes === 0 || i < maxNodes); i++) {
    var kk = keys[i];

    if (Object.prototype.hasOwnProperty.call(value, kk)) {
      val = str(kk, value, -1);

      if (val) {
        partial.push("".concat(kk, ":").concat(val));
      }
    }
  }

  if (partial.length === 0) {
    val = '{}';
  } else {
    val = "{".concat(partial.join(', '));

    if (maxNodes > 0 && length > maxNodes) {
      val += ', ...}';
    } else {
      val += '}';
    }
  }

  return val;
}

function strVal(value) {
  var _value$constructor;

  var maxNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

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
        case 'Date':
          return value.toISOString();

        case 'Array':
        case 'Object':
          return objectify(value, maxNodes);

        case 'Boolean':
        case 'Number':
          return String(value.valueOf());

        case 'String':
          return parseString(value.valueOf());

        default:
          try {
            if (typeof value.toString === 'function') {
              var strValue = value.toString();

              if (strValue !== '' && strValue.indexOf('[object') === -1) {
                return strValue;
              }
            }

            return objectify(value, maxNodes);
          } catch (_unused) {}

          return '';
      }

    default:
      return '';
  }
}

function str(key, holder) {
  var maxNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var value = holder[key];

  if (value && _typeof(value) === 'object' && typeof value.toJSON === 'function') {
    value = value.toJSON(value);
  }

  return strVal(value, maxNodes);
}

function stringify(value) {
  var maxNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return str('', {
    '': value
  }, maxNodes);
}