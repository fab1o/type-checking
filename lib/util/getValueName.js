"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueName = getValueName;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

var _getArticle = require("./getArticle");

var _getTypeName = require("./getTypeName");

var _stringify = require("./stringify");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getValueName(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$includeStrig = options.includeStrigify,
      includeStrigify = _options$includeStrig === void 0 ? true : _options$includeStrig,
      _options$includeTypeN = options.includeTypeName,
      includeTypeName = _options$includeTypeN === void 0 ? true : _options$includeTypeN;

  if (_checkTypes["default"].not.assigned(value) || Number.isNaN(value)) {
    return String(value);
  }

  if (_checkTypes["default"]["function"](value)) {
    var article = includeTypeName ? 'a ' : '';
    return (0, _getTypeName.getTypeName)(value) || "".concat(article, "Function");
  }

  if (_checkTypes["default"].object(value)) {
    var _typeName = (0, _getTypeName.getTypeName)(value);

    if (_typeName !== 'Object') {
      return _typeName;
    }
  }

  var typeName = includeTypeName ? "".concat((0, _getArticle.getArticle)(value)).concat(value.constructor.name) : '';
  var valueStringified = includeStrigify ? (0, _stringify.stringify)(value) : '';
  var colon = includeTypeName && includeStrigify && valueStringified ? ': ' : '';
  return "".concat(typeName).concat(colon).concat(valueStringified);
}