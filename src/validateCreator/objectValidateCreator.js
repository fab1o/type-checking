import Check from '@fab1o/check-types';

import { extendValidateCreator } from './extendValidateCreator';

/**
 * @typedef {Object} Options
 * @property {*} value - User input value for the parameter in question.
 * @property {TypeChecking.MessageBuilder.MessageBuilder} messageBuilder - MessageBuilder object.
 * @property {Array|Object} input - All user input.
 * @property {Error} ErrorType - The Error type to throw.
 *
 * @param {TypeChecking.Type} type - The object type.
 * @param {Object<TypeChecking.Type>} [objParams=null] - Params object built with Types.
 * @desc Creates a checker for Types.object type.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for {@link Types.object}.
 */
export function objectValidateCreator(type, objParams = null) {
    const { isArray } = type;

    const isNested = Check.nonEmptyObject(objParams);

    /**
     * @param {Options} options
     */
    function validate(options) {
        const { value, typeChecker } = options;
        const { messageBuilder, ErrorType } = typeChecker;

        let isOk = false;

        if (isArray) {
            isOk = Check.array.of.object(value);
        } else {
            isOk = Check.object(value);
        }

        if (isOk === false) {
            const errorMessage = messageBuilder.buildMessage({
                value,
                type,
                isNested
            });

            throw new ErrorType(errorMessage);
        }

        if (isNested) {
            const parent = messageBuilder.setParentParams(objParams, isArray);

            if (isArray) {
                value.forEach((val) =>
                    typeChecker.execute({ objParams, parent, input: val })
                );
            }

            typeChecker.execute({ objParams, parent, input: value });
        }
    }

    return extendValidateCreator(validate, 'object');
}
