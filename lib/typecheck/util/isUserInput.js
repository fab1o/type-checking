"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUserInput = isUserInput;

var _checkTypes = _interopRequireDefault(require("check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {*} input User input.
 * @desc Whether or not input is a valid user input.
 * @returns {Boolean}
 *
 */
function isUserInput(input) {
  return _checkTypes["default"].arrayLike(input) && _checkTypes["default"].not.string(input) || _checkTypes["default"].object(input);
}