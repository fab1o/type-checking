"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticle = getArticle;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 *
 * @param {*} value Any value.
 * @returns {String} Gets the correct article for the given value.
 */
function getArticle(value) {
  switch (_typeof(value)) {
    case 'string':
    case 'number':
    case 'function':
    case 'boolean':
      return 'a ';

    case 'object':
      switch (value.constructor.name) {
        case 'Array':
        case 'Object':
          return 'an ';

        default:
          return 'a ';
      }

    default:
      return '';
  }
}