// import { Logger } from '../logger';
import { TypeChecker } from '../typeChecker';

import { validateArguments } from './util';
import { typecheck } from './typecheck';

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
 * @example <caption>Logs the error message instead of throwing an Error</caption>
 * typecheck.log(this, this.method, params, arguments);
 * typecheck.log(this, params, arguments);
 * typecheck.log(func, params, arguments);
 */
function typecheckLogging(...args) {
    // const loggingFunc = args.shift(); ***
    const loggingFunc = 'warn';

    const validatedArguments = validateArguments(args, `typecheck.${loggingFunc}`);

    const typeChecker = new TypeChecker(validatedArguments);

    typeChecker.loggingFunc = loggingFunc;

    typeChecker.execute();
}

// Logger.methods.forEach((loggingFunc) => { ***
//     typecheck[loggingFunc] = typecheckLogging.bind(null, loggingFunc);
// });
typecheck.warn = typecheckLogging;
