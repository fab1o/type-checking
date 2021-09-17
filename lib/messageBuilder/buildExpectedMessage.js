"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildExpectedMessage = buildExpectedMessage;

var _config = require("../config");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function buildExpectedMessage(options) {
  var type = options.type,
      _options$firstType = options.firstType,
      firstType = _options$firstType === void 0 ? '' : _options$firstType,
      _options$expectedArgs = options.expectedArgs,
      expectedArgs = _options$expectedArgs === void 0 ? [] : _options$expectedArgs,
      _options$firstTypeExp = options.firstTypeExpectedArgs,
      firstTypeExpectedArgs = _options$firstTypeExp === void 0 ? [] : _options$firstTypeExp,
      operator = options.operator,
      message = options.message;
  var typeDesc = type.toString.apply(type, [message].concat(_toConsumableArray(expectedArgs)));
  var firstTypeDesc = firstType.toString.apply(firstType, [message].concat(_toConsumableArray(firstTypeExpectedArgs)));

  if (operator) {
    return "".concat(_config.Config.expectedMessage, " ").concat(firstTypeDesc, " ").concat(operator, " ").concat(typeDesc);
  }

  return "".concat(_config.Config.expectedMessage, " ").concat(typeDesc);
}