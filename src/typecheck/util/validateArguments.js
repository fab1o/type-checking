import { MethodSignature, MessageBuilder } from '../../messageBuilder';
import { getUserArgumentsType, UserArgumentsType } from '../../util';

import { composeOverloading } from './composeOverloading';

/**
 * @param {Array} args - Arguments of {@link typecheck}.
 * @param {String} [methodName] - Method name.
 * @desc Validates the given arguments.
 * @throws {TypeError} When arguments are not valid, dev failed to call {@link typecheck} correctly.
 * @returns {Object} An object with signature, params, userArguments, ErrorType and {@link MessageBuilder}.
 */
export function validateArguments(args, methodName) {
    const {
        signature,
        object,
        method,
        c: objParams,
        d: userArguments,
        ErrorType
    } = composeOverloading(args, methodName);

    // ***
    // if (isObjectTypes(objParams) === false) {
    //     throw TypeError(`${signature} params expected an Object built with Types.`);
    // }

    const inputType = getUserArgumentsType(userArguments);

    if (inputType === UserArgumentsType.none) {
        throw TypeError(
            `${signature} arguments expected an Array or an Object. Make sure you invoke typecheck correctly.`
        );
    }

    // display brackets when user arguments type is Object (and not arguments or array).
    const displayBrackets = inputType === UserArgumentsType.object;

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
        userArguments,
        ErrorType
    };
}
