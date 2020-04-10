import Check from 'check-types';

import { optionableTypeCreator } from './optionableTypeCreator';

/**
 *
 * @param {TypeChecking.Type} type Type to create checker.
 * @param {Array<*>} expectedArgs What values are expected for this type.
 * @desc Creates a checker for any type.
 * @throws {Error} When typechecking fails.
 * @returns {Function} Validator function for any type.
 *
 */
export function genericTypeCreator(type, ...expectedArgs) {
    const { assertFunc, isArrayOf, isNullable } = type;

    function validate(options) {
        const { value, messageBuilder, ErrorType } = options;

        if (isNullable && Check.null(value)) {
            return;
        }

        let isOk = false;

        if (isArrayOf) {
            isOk = Check.array.of[assertFunc](value, ...expectedArgs);
        } else {
            isOk = Check[assertFunc](value, ...expectedArgs);
        }

        if (isOk === false) {
            const errorMessage = messageBuilder.buildMessage({
                value,
                expectedArgs,
                type
            });

            throw new ErrorType(errorMessage);
        }
    }

    return optionableTypeCreator(validate, assertFunc);
}
