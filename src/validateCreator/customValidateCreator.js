import { assert } from '@fab1o/check-types';

import { Config } from '../config';

import { extendValidateCreator } from './extendValidateCreator';

/**
 * @param {TypeChecking.Type} type The custom type.
//  * @param {Array<*>} [firstTypeExpectedArgs] - Expected values for the first type of the combinatory type.
 * @param {Function} [validator=()=>false] Custom function that validates input, must return boolean.
 * @param {String} [message] Error message that describes what is expected.
 * @param {Array<*>} expectedArgs What values are expected for this type.
 * @desc Creates a validator for Types.custom type.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for {@link Types.custom}.
 */
// ***
// export function customValidateCreator(
//     type,
//     firstTypeExpectedArgs,
//     validator = () => false,
//     message,
//     ...expectedArgs
// ) {
export function customValidateCreator(
    type,
    validator = () => false,
    message,
    ...expectedArgs
) {
    // const { isArray, arrayOfType } = type; ***
    const { isArray } = type;

    /**
     * @param {*} value - User input value for the param in question.
     * @param {TypeChecking.TypeChecker} typeChecker - TypeChecker object.
     * @param {String} [loggingFunc] - The function name for the logging: log, warn, info, error.
     */
    function validate(value, typeChecker, loggingFunc) {
        // typeChecker will always be assigned here
        const { ErrorType } = typeChecker;

        const errorMessage = typeChecker.messageBuilder.buildMessage({
            value,
            type,
            message,
            expectedArgs
        });

        function assertValue(val) {
            let isOk = false;

            try {
                isOk = validator(val, ...expectedArgs);
                // make sure it's boolean (falsy/truthy values are allowed).
                isOk = !!isOk;
            } catch (ex) {
                Config.logger.warn('TypeChecking', ex);
            }

            if (isOk === false) {
                if (loggingFunc) {
                    Config.logger[loggingFunc](errorMessage);
                } else {
                    throw new ErrorType(errorMessage);
                }
            }
        }

        if (isArray) {
            // check for array or nonEmptyArray
            // ***
            // assert[arrayOfType](value, errorMessage, ErrorType);
            assert.array(value, errorMessage, ErrorType);
            value.forEach((val) => assertValue(val));
        } else {
            assertValue(value);
        }
    }

    return extendValidateCreator(validate, type);
}
