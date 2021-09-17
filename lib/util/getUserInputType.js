"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserInputType = getUserInputType;
exports.UserInputType = void 0;

var _checkTypes = _interopRequireDefault(require("@dss/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserInputType = {
  object: 'object',
  arguments: 'arguments',
  none: 'none'
};
exports.UserInputType = UserInputType;

function getUserInputType(input) {
  if (_checkTypes["default"].object(input)) {
    return UserInputType.object;
  }

  if (_checkTypes["default"].arrayLike(input) && _checkTypes["default"].not.string(input)) {
    return UserInputType.arguments;
  }

  return UserInputType.none;
}