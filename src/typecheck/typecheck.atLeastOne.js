import { TypeCheckerAtLeastOne } from '../typeChecker';

import { typecheck } from './typecheck';
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
 * @desc Checks if at least one of the given arguments was provided while performing type checking.
 * @throws {Error} When type checking fails.
 * @example
 * typecheck.atLeastOne(this, this.method, params, arguments, Error);
 * typecheck.atLeastOne(this, this.method, params, arguments);
 * typecheck.atLeastOne(this, params, arguments);
 * typecheck.atLeastOne(func, params, arguments);
 * typecheck.atLeastOne(params, arguments);
 */
typecheck.atLeastOne = (...args) => {
    const validatedArguments = validateArguments(args, 'typecheck.atLeastOne');

    const typeChecker = new TypeCheckerAtLeastOne(validatedArguments);

    typeChecker.execute();
};
