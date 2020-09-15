import Check from '@fab1o/check-types';

import { extendValidateCreator } from './extendValidateCreator';

/**
 * @typedef {Object} Options
 * @property {*} value User input value for the parameter in question.
 * @property {TypeChecking.MessageBuilder.MessageBuilder} messageBuilder MessageBuilder object.
 * @property {Array|Object} input All user input.
 * @property {Error} ErrorType The Error type to throw.
 *
 * @param {TypeChecking.Type} type Type to create a validator for.
 * @param {Array<*>} expectedArgs What values are expected for this type.
 * @desc Creates a validator that does not skip type checking.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for any type.
 */
export function genericValidateCreator(type, ...expectedArgs) {
    const { name, isArray } = type;

    /**
     * @param {Options} options
     */
    function validate(options) {
        const { value, typeChecker } = options || {};

        // typeChecker may not always be assigned here if dev messed up
        if (Check.not.assigned(typeChecker)) {
            throw SyntaxError(`Types: expected Types.${name} not Types.${name}()`);
        }

        const { messageBuilder, ErrorType } = typeChecker;

        let isOk = false;

        if (isArray) {
            isOk = Check.array.of[name](value, ...expectedArgs);
        } else {
            isOk = Check[name](value, ...expectedArgs);
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

    return extendValidateCreator(validate, name);
}
