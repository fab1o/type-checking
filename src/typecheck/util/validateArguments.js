import { MethodSignature, MessageBuilder } from '../../messageBuilder';
import { getUserInputType, UserInputType } from '../../util';

import { composeOverloading } from './composeOverloading';

/**
 * @param {Array} args - Arguments of {@link typecheck}.
 * @param {String} [methodName] - Method name.
 * @desc Validates the given arguments.
 * @throws {TypeError} When arguments are not valid, user failed to call {@link typecheck} correctly.
 * @returns {Object} An objct with input, params, ErrorType and {@link MessageBuilder}.
 */
export function validateArguments(args, methodName) {
    const {
        signature,
        object,
        method,
        c: objParams,
        d: input,
        ErrorType
    } = composeOverloading(args, methodName);

    // ***
    // if (isObjectTypes(objParams) === false) {
    //     throw TypeError(`${signature} params expected an Object built with Types.`);
    // }

    const inputType = getUserInputType(input);

    if (inputType === UserInputType.none) {
        throw TypeError(
            `${signature} arguments expected an Array or an Object. Make sure you invoke typecheck correctly.`
        );
    }

    // display brackets when input type is Object (and not arguments or array).
    const displayBrackets = inputType === UserInputType.object;

    const methodSignature = new MethodSignature({
        object,
        method,
        objParams,
        displayBrackets
    });

    const messageBuilder = new MessageBuilder(methodSignature);

    return {
        signature,
        messageBuilder,
        objParams,
        input,
        ErrorType
    };
}
