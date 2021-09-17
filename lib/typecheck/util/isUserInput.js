"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUserInput = isUserInput;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isUserInput(input) {
  return _checkTypes["default"].arrayLike(input) && _checkTypes["default"].not.string(input) || _checkTypes["default"].object(input);
}