import { TypeChecker } from '../typeChecker';

import { validateArguments } from './util';

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
export function typecheck(...args) {
    const validatedArguments = validateArguments(args);

    const typeChecker = new TypeChecker(validatedArguments);

    typeChecker.execute();
}
