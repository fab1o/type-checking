import Check from 'check-types';

/**
 *
 * @param {Function} validate Validate function to invoke.
 * @param {TypeChecking.Type} type Type to create optional checker.
 * @desc Creates an isOptional checker for any type, as an option to skip typechecking.
 * @throws {Error} When typechecking fails.
 * @returns {Function} Validator function for any type with `isOptional`.
 *
 */
export function optionableTypeCreator(validate, type) {
    const { isNullable } = type;

    function optionalValidate(isOptional, options) {
        const { value } = options;

        // messageBuilder is undefined when the param setup is wrong. Types.type() versus Types.type
        if (isNullable && Check.null(value)) {
            return;
        }

        if (isOptional === false) {
            validate(options);
        }

        if (Check.not.undefined(value)) {
            validate(options);
        }
    }

    const bindedValidate = optionalValidate.bind(null, false);

    bindedValidate.type = type;

    bindedValidate.optional = optionalValidate.bind(null, true);
    bindedValidate.optional.type = type;

    return bindedValidate;
}
