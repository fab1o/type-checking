"use strict";

var _typeChecker = require("../typeChecker");

var _typecheck = require("./typecheck");

var _util = require("./util");

/**
 * @access public
 * @typedef {Object} Args
 * @property {Function|Object|String} [object] - Class, instance or object name.
 * @property {Function|String} [method] - Function or method name.
 * @property {Object<TypeChecking.Type>} params - Params built with Types.
 * @property {Array|Object} arguments - User data.
 * @property {Error} [ErrorType=Config.ErrorType] - The Error type to throw.
 *
 * @param {...Args} args
 * @desc Checks if at least one of the given arguments was provided while performing type checking.
 * @throws {Error} When type checking fails.
 * @example
 * typecheck.atLeastOne(this, this.method, params, arguments, Error);
 * typecheck.atLeastOne(this, this.method, params, arguments);
 * typecheck.atLeastOne(this, params, arguments);
 * typecheck.atLeastOne(func, params, arguments);
 * typecheck.atLeastOne(params, arguments);
 */
_typecheck.typecheck.atLeastOne = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var validatedArguments = (0, _util.validateArguments)(args, 'typecheck.atLeastOne');
  var typeChecker = new _typeChecker.TypeCheckerAtLeastOne(validatedArguments);
  typeChecker.execute();
};