import Check from '@fab1o/check-types';

import { checkValue } from './util/checkValue';
import { extendValidateCreator } from './extendValidateCreator';
import { logValidateCreator } from './logValidateCreator';

/**
 * @param {TypeChecking.Type} type - Type to create a validator for.
// * @param {Array<*>} [firstTypeExpectedArgs] - Expected values for the first type of the combinatory type.
 * @param {Array<*>} [expectedArgs] - Expected values for this type.
 * @desc Creates a validator for any type.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for any type.
 */
// export function genericValidateCreator(type, firstTypeExpectedArgs, ...expectedArgs) {
export function genericValidateCreator(type, ...expectedArgs) {
    const { name: typeName, isExtensible } = type;

    /**
     * @param {*} value - User input value for the param in question.
     * @param {TypeChecking.TypeChecker} typeChecker - TypeChecker object.
     * @param {String} [loggingFunc] - The function name for the logging: log, warn, info, error.
     */
    function validate(value, typeChecker, loggingFunc) {
        // typeChecker may not always be assigned here if dev messed up
        if (Check.not.assigned(typeChecker)) {
            throw TypeError(
                `typecheck(...) params expected Types.${typeName} not Types.${typeName}()`
            );
        }

        checkValue(
            value,
            type,
            typeChecker,
            loggingFunc,
            // firstTypeExpectedArgs,
            ...expectedArgs
        );
    }

    if (isExtensible) {
        return extendValidateCreator(validate, type); // , ...expectedArgs);
    }

    return logValidateCreator(validate, { typeName });
}
