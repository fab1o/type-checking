import { Check } from '@fab1o/check-types';

import { checkValue } from './util/checkValue';
import { extendValidateCreator } from './extendValidateCreator';

/**
 * @param {TypeChecking.Type} type - The object type.
//  * @param {Array<*>} [firstTypeExpectedArgs] - Expected values for the first type of the combinatory type.
 * @param {Object<TypeChecking.Type>} [objParams] - Params object built with Types.
 * @desc Creates a checker for Types.object type.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for {@link Types.object}.
 */
// export function objectValidateCreator(type, firstTypeExpectedArgs, objParams = null) {
export function objectValidateCreator(type, objParams) {
    const { isArray } = type;

    // if (Check.not.nonEmptyObject(objParams) && Check.not.undefined(objParams)) {
    //     throw TypeError(
    //         'typecheck(...) params inside Types.object() expected a non-empty Object or undefined.'
    //     );
    // }

    const isNested = Check.nonEmptyObject(objParams);

    /**
     * @param {*} value - User input value for the param in question.
     * @param {TypeChecking.TypeChecker} typeChecker - TypeChecker object.
     * @param {String} [loggingFunc] - The function name for the logging: log, warn, info, error.
     */
    function validate(value, typeChecker, loggingFunc) {
        const isOk = checkValue(value, type, typeChecker, loggingFunc); // , firstTypeExpectedArgs); ***

        if (isOk && isNested) {
            const parent = typeChecker.messageBuilder.setParentParams(objParams, isArray);

            if (isArray) {
                value.forEach((val) =>
                    typeChecker.execute({ objParams, parent, userData: val })
                );
            } else {
                typeChecker.execute({ objParams, parent, userData: value });
            }
        }
    }

    return extendValidateCreator(validate, type);
}
