"use strict";

var _typeChecker = require("../typeChecker");

var _typecheck = require("./typecheck");

var _util = require("./util");

_typecheck.typecheck.atLeastOne = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var validatedArguments = (0, _util.validateArguments)(args, 'typecheck.atLeastOne');
  var typeChecker = new _typeChecker.TypeCheckerAtLeastOne(validatedArguments);
  typeChecker.execute();
};