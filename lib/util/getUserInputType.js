"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInputType = getUserInputType;
exports.UserInputTypes = void 0;

var _checkTypes = _interopRequireDefault(require("check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @typedef {Object} UserInputTypes
 * @property {String} object Object.
 * @property {String} arguments JavaScript arguments or Rest parameter.
 * @property {String} none None.
 */
var UserInputTypes = {
  object: 'object',
  arguments: 'arguments',
  none: 'none'
};
/**
 *
 * @param {*} input User input.
 * @desc Gets the type of user input that was given.
 * @returns {Boolean}
 *
 */

exports.UserInputTypes = UserInputTypes;

function getUserInputType(input) {
  if (_checkTypes["default"].arrayLike(input) && _checkTypes["default"].not.string(input)) {
    return UserInputTypes.arguments;
  }

  if (_checkTypes["default"].object(input)) {
    return UserInputTypes.object;
  }

  return UserInputTypes.none;
}