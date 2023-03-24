"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = getValue;
var _getUserArgumentsType = require("./getUserArgumentsType");
function getValue(userData, paramIndex, name) {
  var inputType = (0, _getUserArgumentsType.getUserArgumentsType)(userData);
  switch (inputType) {
    case _getUserArgumentsType.UserArgumentsType.array:
      return userData[paramIndex];
    case _getUserArgumentsType.UserArgumentsType.object:
      return userData[name];
    default:
      throw ReferenceError('typecheckParams(...) error in step2.');
  }
}