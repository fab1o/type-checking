import Check from 'check-types';

import { inheritance } from '../../util';

/**
 *
 * @param {Array} args User input (arguments).
 * @param {String} [methodName='typecheck'] Method name to be used in the signature.
 * @desc Transforms user input into a distinct Object.
 * @returns {Object} An object like {signature, a, b, c, d, e}.
 *
 */
export function composeOverloading(args, methodName = 'typecheck') {
    let object, method, params, input, errorType;

    const signature = `${methodName}(...)`;

    switch (args.length) {
        case 5:
            // typecheck(object, method, params, arguments, errorType)
            [object, method, params, input, errorType] = args;
            break;

        case 4:
            if (inheritance(args[3], Error)) {
                if (Check.function(args[0]) || Check.string(args[0])) {
                    // typecheck(function, params, arguments, errorType)
                    [method, params, input, errorType] = args;
                } else {
                    // typecheck(object, params, arguments, errorType)
                    [object, params, input, errorType] = args;
                }
            } else {
                // typecheck(object, method, params, arguments)
                [object, method, params, input] = args;
            }
            break;

        case 3:
            if (inheritance(args[2], Error)) {
                // typecheck(params, arguments, errorType)
                [params, input, errorType] = args;
            } else if (Check.function(args[0]) || Check.string(args[0])) {
                // typecheck(function, params, arguments)
                [method, params, input] = args;
            } else {
                // typecheck(object, params, arguments)
                [object, params, input] = args;
            }

            break;

        case 2:
            // typecheck(params, arguments)
            [params, input] = args;

            break;

        default:
            [params] = args;
            break;
    }

    /**
     *
     * @property {String} signature
     * @property {Object|String} object Instance of a class, object or name.
     * @property {Function|String} method Function or function name.
     * @property {Object<TypeChecking.Type>} params Params built with Types.
     * @property {Array|Object} input User input (arguments).
     * @property {Error} errorType The Error type to throw.
     *
     */
    return {
        signature,
        a: object,
        b: method,
        c: params,
        d: input,
        e: errorType
    };
}
