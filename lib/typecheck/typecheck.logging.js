"use strict";

var _logger = require("../logger");

var _typeChecker = require("../typeChecker");

var _util = require("./util");

var _typecheck = require("./typecheck");

function typecheckLogging() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var loggingFunc = args.shift();
  var validatedArguments = (0, _util.validateArguments)(args, "typecheck.".concat(loggingFunc));
  var typeChecker = new _typeChecker.TypeChecker(validatedArguments);
  typeChecker.loggingFunc = loggingFunc;
  typeChecker.execute();
}

_logger.Logger.methods.forEach(function (loggingFunc) {
  _typecheck.typecheck[loggingFunc] = typecheckLogging.bind(null, loggingFunc);
});