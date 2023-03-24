"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserArgumentsType = void 0;
exports.getUserArgumentsType = getUserArgumentsType;
var _checkTypes = require("@fab1o/check-types");
var UserArgumentsType = {
  object: 1,
  array: 2,
  none: 0
};
exports.UserArgumentsType = UserArgumentsType;
function getUserArgumentsType(userArguments) {
  if (_checkTypes.Check.object(userArguments)) {
    return UserArgumentsType.object;
  }
  if (_checkTypes.Check.arrayLike(userArguments) && _checkTypes.Check.not.string(userArguments)) {
    return UserArgumentsType.array;
  }
  return UserArgumentsType.none;
}
