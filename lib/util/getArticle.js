"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticle = getArticle;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getArticleOfObject(value) {
  if (_checkTypes["default"].not["function"](value.constructor)) {
    return '';
  }

  var firstLetter = value.constructor.name.substr(0, 1).toLowerCase();

  switch (firstLetter) {
    case 'a':
    case 'e':
    case 'i':
    case 'o':
    case 'u':
      return 'an ';

    default:
      return 'a ';
  }
}

function getArticle(value) {
  switch (_typeof(value)) {
    case 'string':
    case 'number':
    case 'function':
    case 'boolean':
      return 'a ';

    case 'object':
      return getArticleOfObject(value);

    default:
      return '';
  }
}