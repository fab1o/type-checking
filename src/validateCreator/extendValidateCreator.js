/* eslint-disable no-param-reassign */
import { Check } from '@fab1o/check-types';

import { defineProperty } from '../util/defineProperty';

// import { Config } from '../config';

// import { createValidators } from './util/createValidators';
import { logValidateCreator } from './logValidateCreator';

/**
 * @param {Function} validate - Validate function to invoke.
 * @param {TypeChecking.Type} type - Type to extend a validator for.
 // * @param {Array<*>} expectedArgs - Expected values for this type.
 * @desc Creates a validator and extends it with optional, nullable and undefinable.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function with optional, nullable and undefinable.
 * @note Type can be either nullable or optionable, cannot be both.
 */
export function extendValidateCreator(validate, type) {
    // }, ...expectedArgs) {
    const { name: typeName } = type;

    /**
     * @param {*} value - User input value for the param in question.
     * @param {Array|Object} input - All user input.
     * @param {TypeChecking.TypeChecker} typeChecker - TypeChecker object.
     * @param {String} loggingFunc - The function name for the logging: log, warn, info, error.
     */
    function optionalValidate(value, input, typeChecker, loggingFunc) {
        if (Check.not.assigned(value)) {
            return;
        }

        validate(value, input, typeChecker, loggingFunc);
    }

    validate = logValidateCreator(validate, { typeName });

    defineProperty(
        validate,
        'optional',
        logValidateCreator(optionalValidate, {
            typeName,
            isOptional: true
        })
    );

    // validate.optional = logValidateCreator(optionalValidate, {
    //     typeName,
    //     isOptional: true
    // });

    // ***
    // const nullableValidate = function (value, input, typeChecker, loggingFunc) {
    //     if (Check.null(value)) {
    //         return;
    //     }
    //     validate(value, input, typeChecker, loggingFunc);
    // };
    //
    // const undefinableValidate = function (value, input, typeChecker, loggingFunc) {
    //     if (Check.undefined(value)) {
    //         return;
    //     }
    //     validate(value, input, typeChecker, loggingFunc);
    // };
    // validate.nullable = logValidateCreator(nullableValidate, {
    //     typeName,
    //     isNullable: true
    // });
    // validate.undefinable = logValidateCreator(undefinableValidate, {
    //     typeName,
    //     isUndefinable: true
    // });
    //
    // if (type.or.asserts) {
    //     validate.or = createValidators(type, 'or', expectedArgs);
    // }
    //
    // if (type.and.asserts) {
    //     validate.and = createValidators(type, 'and', expectedArgs);
    // }

    return validate;
}
