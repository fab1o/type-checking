import Check from 'check-types';

import { typecheckParams } from '../util';
import { optionableTypeCreator } from './optionableTypeCreator';

/**
 *
 * @param {TypeChecking.Type} typeObject The object type.
 * @param {Object<TypeChecking.Type>} [params=null] Params object built with Types.
 * @desc Creates a checker for Types.object type.
 * @throws {Error} When typechecking fails.
 * @returns {Function} Validator function for `Types.object`.
 *
 */
export function objectTypeCreator(typeObject, params = null) {
    const { isArrayOf, isNullable } = typeObject;
    const isNested = Check.nonEmptyObject(params);

    function validate(options) {
        const { value, messageBuilder, paramIndex, ErrorType } = options;

        if (isNullable && Check.null(value)) {
            return;
        }

        let isOk = false;

        if (isArrayOf && isNested) {
            isOk = Check.array.of.nonEmptyObject(value);
        } else if (isArrayOf) {
            isOk = Check.array.of.object(value);
        } else if (isNested) {
            isOk = Check.nonEmptyObject(value);
        } else {
            isOk = Check.object(value);
        }

        if (isOk === false) {
            const errorMessage = messageBuilder.buildMessage({
                value,
                isNested,
                type: typeObject
            });

            throw new ErrorType(errorMessage);
        }

        if (isNested) {
            const parent = messageBuilder.methodSignature.replaceObjectParams(
                paramIndex,
                params,
                isArrayOf
            );

            if (isArrayOf) {
                value.map((v) => typecheckParams({ ...options, params, parent, input: v }));
            }

            typecheckParams({ ...options, params, parent, input: value });
        }
    }

    return optionableTypeCreator(validate, 'object');
}
