"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValue = getValue;

var _getUserInputType = require("./getUserInputType");

/**
 * @param {Array|Object} input - The user input.
 * @param {Number} paramIndex - The index in user input.
 * @param {String} name - The name of a property in user input.
 * @desc Gets the user input value: Step 2 of typecheckParams.
 * @throws {ReferenceError} Internal failure.
 * @returns {*} The respective value in user input.
 */
function getValue(input, paramIndex, name) {
  // we must get the input type here
  var inputType = (0, _getUserInputType.getUserInputType)(input);

  switch (inputType) {
    case _getUserInputType.UserInputType.arguments:
      return input[paramIndex];

    case _getUserInputType.UserInputType.object:
      return input[name];

    default:
      // it should never get to this point. A user input must be either arguments or an options object,
      // and it's enforced on ./typecheck/util/validateArguments.js
      throw ReferenceError('typecheckParams(...) error in step2.');
  }
}