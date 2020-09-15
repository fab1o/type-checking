import Check from '@fab1o/check-types';

import { extendValidateCreator } from './extendValidateCreator';

// Regex pattern for matching ISO datetimes.
const ISO_REG_EX = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?(Z|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

/**
 *
 * @typedef {Object} Options
 * @property {*} value User input value for the parameter in question.
 * @property {TypeChecking.MessageBuilder.MessageBuilder} messageBuilder MessageBuilder object.
 * @property {Array|Object} input All user input.
 * @property {Error} ErrorType The Error type to throw.
 *
 * @param {TypeChecking.Type} type The dateString type.
 * @desc Creates a validator for Types.dateString type that checks for an ISO date format String.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for {@link Types.dateString}.
 * @note Parsing date strings with the Date constructor or Date.parse is discouraged.
 *
 */
export function dateStringValidateCreator(type) {
    const { isArray } = type;

    /**
     * @param {Options} options
     */
    function validate(options) {
        const { value, typeChecker } = options || {};

        // typeChecker may not always be assigned here if dev messed up
        if (Check.not.assigned(typeChecker)) {
            throw SyntaxError(`Types: expected Types.dateString not Types.dateString()`);
        }

        const { messageBuilder, ErrorType } = typeChecker;

        const errorMessage = messageBuilder.buildMessage({
            value,
            type
        });

        function assertValue(val) {
            Check.assert(ISO_REG_EX.test(val), errorMessage, ErrorType);
        }

        if (isArray) {
            // do not fail if array is empty
            Check.assert.array(value, errorMessage, ErrorType);
            value.forEach((val) => assertValue(val));
        } else {
            assertValue(value);
        }
    }

    return extendValidateCreator(validate, 'dateString');
}
