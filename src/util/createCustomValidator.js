import { customValidateCreator } from '../validateCreator';

/**
 * @param {TypeChecking.Type} type - The first type from types.or.type.
 * @param {Function} [validator=() => false] - Custom function that validates input, must return boolean.
 * @param {String} [message] - Error message that describes what is expected.
 * @desc Creates a custom type validator.
 * @returns {Function} Validator function.
 */
export function createCustomValidator(type, validator = () => false, message) {
    if (type.expectArgs) {
        const validateWithArguments = function (...args) {
            // return customValidateCreator(type, null, validator, message, ...args); ***
            return customValidateCreator(type, validator, message, ...args);
        };

        return validateWithArguments.bind(type);
    }

    // return customValidateCreator(type, null, validator, message); ***
    return customValidateCreator(type, validator, message);
}
