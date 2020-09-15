import { assert } from '@fab1o/check-types';

import { extendValidateCreator } from './extendValidateCreator';

/**
 * @typedef {Object} Options
 * @property {*} value User input value for the parameter in question.
 * @property {TypeChecking.MessageBuilder.MessageBuilder} messageBuilder MessageBuilder object.
 * @property {Array|Object} input All user input.
 * @property {Error} ErrorType The Error type to throw.
 *
 * @param {TypeChecking.Type} type The custom type.
 * @param {Function} [validator=() => false] Custom function that validates input, must return boolean.
 * @param {String} [message] Error message that describes what is expected.
 * @param {Array<*>} expectedArgs What values are expected for this type.
 * @desc Creates a validator for Types.custom type.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for {@link Types.custom}.
 */
export function customValidateCreator(
    type,
    validator = () => false,
    message,
    ...expectedArgs
) {
    const { isArray } = type;

    /**
     * @param {Options} options
     */
    function validate(options) {
        const { value, typeChecker, input } = options;
        // typeChecker will always be assigned here
        const { messageBuilder, ErrorType } = typeChecker;

        const errorMessage = messageBuilder.buildMessage({
            value,
            type,
            message,
            expectedArgs
        });

        function assertValue(val) {
            let isOk = false;

            try {
                // pass in the the whole user 'input' to dev - could be useful.
                isOk = validator(val, input, ...expectedArgs);
            } catch (ex) {
                throw new ErrorType(
                    `${messageBuilder.methodSignature} ${type.name} validator function threw an error: ${ex.message}`
                );
            }

            assert(isOk, errorMessage, ErrorType);
        }

        if (isArray) {
            // do not fail if array is empty
            assert.array(value, errorMessage, ErrorType);
            value.forEach((val) => assertValue(val));
        } else {
            assertValue(value);
        }
    }

    return extendValidateCreator(validate, type.name);
}
