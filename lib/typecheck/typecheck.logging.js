"use strict";

var _typeChecker = require("../typeChecker");

var _util = require("./util");

var _typecheck = require("./typecheck");

function typecheckLogging() {
  var loggingFunc = 'warn';

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var validatedArguments = (0, _util.validateArguments)(args, "typecheck.".concat(loggingFunc));
  var typeChecker = new _typeChecker.TypeChecker(validatedArguments);
  typeChecker.loggingFunc = loggingFunc;
  typeChecker.execute();
}

_typecheck.typecheck.warn = typecheckLogging;