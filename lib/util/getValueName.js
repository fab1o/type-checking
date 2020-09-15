"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueName = getValueName;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _getArticle = require("./getArticle");

var _getTypeName = require("./getTypeName");

var _stringify = require("./stringify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Reflection library - getValueName
 *
 * Use this function for:
 *   - Any type of variable
 */

/**
 * @param {*} value Any value.
 * @param {Object} [options]
 * @param {Boolean} [options.includeStrigify=true] Whether it should present the value.
 * @param {Boolean} [options.includeTypeName=true] Whether it should present the type name.
 * @desc Gets the value name as a String, ie: strings, numbers, booleans, functions or class definitions, objects or class instances or arrays, null, undefined, NaN
 * @returns {String}
 */
function getValueName(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$includeStrig = options.includeStrigify,
      includeStrigify = _options$includeStrig === void 0 ? true : _options$includeStrig,
      _options$includeTypeN = options.includeTypeName,
      includeTypeName = _options$includeTypeN === void 0 ? true : _options$includeTypeN; // null, undefined, NaN

  if (_checkTypes["default"].not.assigned(value) || Number.isNaN(value)) {
    return String(value);
  } // function


  if (_checkTypes["default"]["function"](value)) {
    var article = includeTypeName ? (0, _getArticle.getArticle)(value) : '';
    return (0, _getTypeName.getTypeName)(value) || "".concat(article, "Function");
  } // class instance only


  if (_checkTypes["default"].object(value)) {
    var _typeName = (0, _getTypeName.getTypeName)(value);

    if (_typeName !== 'Object') {
      return _typeName;
    }
  } // primitives, Array and simple objects


  var typeName = includeTypeName ? "".concat((0, _getArticle.getArticle)(value)).concat(value.constructor.name) : '';
  var colon = includeTypeName && includeStrigify ? ': ' : '';
  var valueStringified = includeStrigify ? (0, _stringify.stringify)(value) : '';
  return "".concat(typeName).concat(colon).concat(valueStringified);
}