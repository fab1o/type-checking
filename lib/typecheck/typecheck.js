"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typecheck = void 0;

var _engine = require("./util/engine");

/**
 *
 * @param {Object} [object] Class instance or object.
 * @param {Function} [method] Function or method.
 * @param {Object<TypeChecking.Type>} params Params built with Types.
 * @param {Array|Object} input User input (arguments).
 * @param {Error} [ErrorType=Config.Error] The Error type to throw.
 * @desc Type checks an object's method or a stand-alone function, there are 4 ways of calling typecheck. See examples.
 * @throws {Error} If typechecking fails.
 * @example
 * typecheck(this, this.method, params, arguments, Error);
 *
 * typecheck(this, this.method, params, arguments);
 *
 * typecheck(this, params, arguments);
 *
 * typecheck(func, params, arguments);
 *
 * typecheck(params, arguments);
 *
 */
var typecheck = _engine.engine.bind(null, false);

exports.typecheck = typecheck;