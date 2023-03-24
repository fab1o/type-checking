"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueName = getValueName;
var _checkTypes = require("@fab1o/check-types");
var _getArticle = require("./getArticle");
var _getTypeName = require("./getTypeName");
var _getTypeToString = require("./getTypeToString");
var _stringify = require("./stringify");
function getValueName(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$includeTypeN = options.includeTypeName,
    includeTypeName = _options$includeTypeN === void 0 ? false : _options$includeTypeN;
  if (_checkTypes.Check.not.assigned(value) || Number.isNaN(value)) {
    return String(value);
  }
  if (_checkTypes.Check["function"](value)) {
    return (0, _getTypeToString.getTypeToString)(value);
  }
  if (_checkTypes.Check.object(value)) {
    var typeName = (0, _getTypeToString.getTypeToString)(value);
    if (typeName !== 'Object' && typeName !== 'an Object') {
      return typeName;
    }
  }
  var valueName = (0, _stringify.stringify)(value);
  if (includeTypeName) {
    var _typeName = "".concat((0, _getArticle.getArticle)(value)).concat((0, _getTypeName.getTypeName)(value));
    if (valueName) {
      return "".concat(_typeName, ": ").concat(valueName);
    }
    return _typeName;
  }
  return valueName;
}
