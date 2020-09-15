"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typecheck = typecheck;

var _typeChecker = require("../typeChecker");

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
 * @desc Type checks an object's method or a stand-alone function or stand-alone object.
 * @throws {Error} When type checking fails.
 * @example
 * typecheck(this, this.method, params, arguments, Error);
 * typecheck(this, this.method, params, arguments);
 * typecheck(this, params, arguments);
 * typecheck(func, params, arguments);
 * typecheck(params, arguments);
 */
function typecheck() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var validatedArguments = (0, _util.validateArguments)(args);
  var typeChecker = new _typeChecker.TypeChecker(validatedArguments);
  typeChecker.execute();
}