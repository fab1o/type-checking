"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInputType = getUserInputType;
exports.UserInputType = void 0;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @enum {String}
 * @typedef {Object} UserInputType
 * @property {String} object 'object' - An Object.
 * @property {String} arguments 'arguments' - JavaScript arguments.
 * @property {String} none 'none' - Neither Object nor arguments.
 */
var UserInputType = {
  object: 'object',
  arguments: 'arguments',
  none: 'none'
};
/**
 * @param {*} input User input.
 * @desc Gets the type of user input that was given.
 * @returns {UserInputType}
 */

exports.UserInputType = UserInputType;

function getUserInputType(input) {
  // Due to how check-types considers an object that has a length prop to be an arrayLike,
  // the order of IFs must be the following:
  // 1) check for an object
  // 2) check for an arrayLike
  // Do not change this order!
  if (_checkTypes["default"].object(input)) {
    return UserInputType.object;
  }

  if (_checkTypes["default"].arrayLike(input) && _checkTypes["default"].not.string(input)) {
    return UserInputType.arguments;
  }

  return UserInputType.none;
}