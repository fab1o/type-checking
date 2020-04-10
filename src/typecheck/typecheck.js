import { engine } from './util/engine';

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
export const typecheck = engine.bind(null, false);
