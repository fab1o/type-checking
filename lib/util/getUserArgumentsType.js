"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserArgumentsType = void 0;
exports.getUserArgumentsType = getUserArgumentsType;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserArgumentsType = {
  object: 1,
  array: 2,
  none: 0
};
exports.UserArgumentsType = UserArgumentsType;

function getUserArgumentsType(userArguments) {
  if (_checkTypes["default"].object(userArguments)) {
    return UserArgumentsType.object;
  }

  if (_checkTypes["default"].arrayLike(userArguments) && _checkTypes["default"].not.string(userArguments)) {
    return UserArgumentsType.array;
  }

  return UserArgumentsType.none;
}