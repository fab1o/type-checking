"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = stringify;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable no-control-regex, no-misleading-character-class, no-case-declarations */
// based on https://github.com/douglascrockford/JSON-js/blob/master/json2.js
var rxEscapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var meta = {
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\f': '\\f',
  '\r': '\\r',
  '"': '\\"',
  '\\': '\\\\'
};

function str(key, holder) {
  var maxLevel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var i, v, length, partial;
  var value = holder[key];

  if (value && _typeof(value) === 'object' && typeof value.toJSON === 'function') {
    value = value.toJSON(value);
  }

  switch (_typeof(value)) {
    case 'string':
      rxEscapable.lastIndex = 0;

      if (rxEscapable.test(value)) {
        return "\"".concat(value.replace(rxEscapable, function (a) {
          var c = meta[a];

          if (typeof c === 'string') {
            return c;
          }

          return "\\u".concat("0000".concat(a.charCodeAt(0).toString(16)).slice(-4));
        }), "\"");
      }

      return "\"".concat(value, "\"");

    case 'number':
      return Number.isFinite(value) ? String(value) : 'null';

    case 'boolean':
      return String(value);

    case 'object':
      if (!value) {
        return 'null';
      }

      if (maxLevel === -1) {
        if (Object.prototype.toString.apply(value) === '[object Array]') {
          return value.length > 0 ? '[...]' : '[]';
        }

        return Object.keys(value).length > 0 ? '{...}' : '{}';
      }

      partial = [];

      if (Object.prototype.toString.apply(value) === '[object Array]') {
        length = value.length;

        for (i = 0; i < length && (maxLevel === 0 || i < maxLevel); i++) {
          partial[i] = str(i, value, -1) || 'null';
        }

        if (partial.length === 0) {
          v = '[]';
        } else {
          v = "[".concat(partial.join(', '));

          if (maxLevel > 0 && length > maxLevel) {
            v += ', ...]';
          } else {
            v += ']';
          }
        }

        return v;
      }

      var keys = Object.keys(value);
      length = keys.length;

      for (i = 0; i < length && (maxLevel === 0 || i < maxLevel); i++) {
        var kk = keys[i];

        if (Object.prototype.hasOwnProperty.call(value, kk)) {
          v = str(kk, value, -1);

          if (v) {
            partial.push("".concat(kk, ":").concat(v));
          }
        }
      }

      if (partial.length === 0) {
        v = '{}';
      } else {
        v = "{".concat(partial.join(', '));

        if (maxLevel > 0 && length > maxLevel) {
          v += ', ...}';
        } else {
          v += '}';
        }
      }

      return v;

    default:
      return '';
  }
}
/**
 *
 * @param {Object|Array} value The object or array.
 * @param {Number} [maxLevel] Max number of nodes to stringify.
 * @desc Stringify an object.
 * @returns {String}
 *
 */


function stringify(value, maxLevel) {
  return str('', {
    '': value
  }, maxLevel);
}