"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = getValue;

var _getUserInputType = require("./getUserInputType");

function getValue(input, paramIndex, name) {
  var inputType = (0, _getUserInputType.getUserInputType)(input);

  switch (inputType) {
    case _getUserInputType.UserInputType.arguments:
      return input[paramIndex];

    case _getUserInputType.UserInputType.object:
      return input[name];

    default:
      throw ReferenceError('typecheckParams(...) error in step2.');
  }
}