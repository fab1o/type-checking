import Check from '@fab1o/check-types';

/**
 * @typedef {Object} TypeCheckArgs
 * @property {String} signature Function's signature: name and parameters.
 * @property {Object|String} object Instance of a class, object or name.
 * @property {Function|String} method Function or function name.
 * @property {Object<TypeChecking.Type>} c Params built with Types.
 * @property {Array|Object} d User input (arguments).
 * @property {Error} e The Error type to throw.
 *
 */

/**
 * @typedef {Object} TypeCheckIfArgs
 * @property {String} signature Function's signature: name and parameters.
 * @property {Object|String} object Instance of a class, object or name.
 * @property {Function|String} method Function or function name.
 * @property {Function} c Custom validator function.
 * @property {String} d Error message.
 * @property {Error} e The Error type to throw.
 */

/**
 *
 * @param {Array} args User input (arguments).
 * @param {String} [methodName='typecheck'] Method name to be used in the signature.
 * @desc Transforms user input into a distinct Object.
 * @returns {TypeCheckArgs|TypeCheckIfArgs} An object like {signature, object, method, c, d, ErrorType}.
 */
export function composeOverloading(args, methodName = 'typecheck') {
    let object, method, params, input, ErrorType;

    const signature = `${methodName}(...)`;

    switch (args.length) {
        case 5:
            // typecheck(object, method, params, arguments, ErrorType)
            [object, method, params, input, ErrorType] = args;

            break;

        case 4:
            if (Check.inheritance(args[3], Error)) {
                if (Check.function(args[0]) || Check.string(args[0])) {
                    // typecheck(function, params, arguments, ErrorType)
                    [method, params, input, ErrorType] = args;
                } else {
                    // typecheck(object, params, arguments, ErrorType)
                    [object, params, input, ErrorType] = args;
                }
            } else {
                // typecheck(object, method, params, arguments)
                [object, method, params, input] = args;
            }

            break;

        case 3:
            if (Check.inheritance(args[2], Error)) {
                // typecheck(params, arguments, ErrorType)
                [params, input, ErrorType] = args;
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

    return {
        signature,
        object,
        method,
        c: params,
        d: input,
        ErrorType
    };
}
