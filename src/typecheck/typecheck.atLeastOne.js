import { typecheck } from './typecheck';
import { engine } from './util/engine';

/**
 *
 * @param {Object} [object] Class instance or object.
 * @param {Function} [method] Function or method.
 * @param {Object<TypeChecking.Type>} params Params built with Types.
 * @param {Array|Object} input User input (arguments).
 * @param {Error} [ErrorType=Config.Error] The Error type to throw.
 * @desc Checks if at least one of the given arguments was provided by the user.
 * @throws {Error} When typechecking fails.
 * @example
 * typecheck.atLeastOne(this, this.method, params, arguments, Error);
 *
 * typecheck.atLeastOne(this, this.method, params, arguments);
 *
 * typecheck.atLeastOne(this, params, arguments);
 *
 * typecheck.atLeastOne(func, params, arguments);
 *
 * typecheck.atLeastOne(params, arguments);
 *
 */
typecheck.atLeastOne = engine.bind(null, true);
