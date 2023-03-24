"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typecheck = typecheck;
var _typeChecker = require("../typeChecker");
var _util = require("./util");
function typecheck() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var validatedArguments = (0, _util.validateArguments)(args);
  var typeChecker = new _typeChecker.TypeChecker(validatedArguments);
  typeChecker.execute();
}