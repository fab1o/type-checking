import Check from 'check-types';

import { optionableTypeCreator } from './optionableTypeCreator';

/**
 *
 * @param {TypeChecking.Type} typeCustom The custom type.
 * @param {Function} [customValidator=() => false] Custom function that returns falsy/truthy.
 * @param {String} [customMessage=''] Error message that describes what is expected.
 * @desc Creates a checker for Types.custom type.
 * @throws {Error} When typechecking fails.
 * @returns {Function} Validator function for `Types.custom`.
 *
 */
export function customTypeCreator(typeCustom, customValidator = () => false, customMessage = '') {
    const { isArrayOf, isNullable } = typeCustom;

    function validate(options) {
        const { value, messageBuilder, input, ErrorType } = options;

        if (isNullable && Check.null(value)) {
            return;
        }

        const errorMessage = messageBuilder.buildMessage({
            value,
            customMessage,
            type: typeCustom
        });

        function assertValue(val) {
            let isOk = false;

            try {
                isOk = customValidator(val, input);
            } catch (ex) {
                throw new ErrorType(
                    `${messageBuilder.methodSignature} Your custom validator function threw an error: ${ex.message}`
                );
            }

            Check.assert(isOk, errorMessage, ErrorType);
        }

        if (isArrayOf) {
            Check.assert.array(value, errorMessage, ErrorType);

            value.map((v) => assertValue(v));
        }

        assertValue(value);
    }

    return optionableTypeCreator(validate, 'custom');
}
