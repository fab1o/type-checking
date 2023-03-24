"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUserInput = isUserInput;
var _checkTypes = require("@fab1o/check-types");
function isUserInput(input) {
  return _checkTypes.Check.arrayLike(input) && _checkTypes.Check.not.string(input) || _checkTypes.Check.object(input);
}
