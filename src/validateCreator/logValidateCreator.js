/* eslint-disable no-param-reassign */
// ***
// import { Logger } from '../logger';

import { defineProperty } from '../util/defineProperty';

/**
 * @param {Function} validate - Validate function.
 * @param {Object} props - Validate function properties.
 * @param {String} props.typeName - Type name.
 * @param {Boolean} [props.isOptional] - Whether validate is optional.
 * @param {Boolean} [props.isNullable] - Whether validate is nullable.
 * @param {Boolean} [props.isUndefinable] - Whether validate is undefinable.
 * @desc Creates a validator and extend it with logging functions.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function with logging functions.
 */
export function logValidateCreator(validate, props) {
    /**
    //  * @param {String} loggingFunc - The function name for the logging: log, warn, info, error.
     *
     * @param {*} value - User input value for the param in question.
     * @param {TypeChecking.TypeChecker} typeChecker - TypeChecker object.
     */
    function logValidate(value, typeChecker) {
        validate(value, typeChecker, 'warn');
    }

    // ***
    // const { typeName, isOptional, isNullable, isUndefinable } = props;
    const { typeName, isOptional } = props;

    defineProperty(validate, 'warn', logValidate);

    // validate.warn = logValidate;

    // set flag to true for this log function

    defineProperty(validate.warn, 'isLogging', true);
    // validate.warn.isLogging = true;

    // copy flags over

    defineProperty(validate.warn, 'typeName', typeName);
    defineProperty(validate.warn, 'isOptional', isOptional);
    // validate.warn.typeName = typeName;
    // validate.warn.isOptional = isOptional;

    // ***
    // validate.warn.isNullable = isNullable;
    // validate.warn.isUndefinable = isUndefinable;
    //
    // Logger.methods.forEach((func) => {
    //     // create new log validator function
    //     validate[func] = logValidate.bind(null, func);
    //
    //     // set flag to true for this log function
    //     validate[func].isLogging = true;
    //
    //     // copy flags over
    //     validate[func].typeName = typeName;
    //     validate[func].isOptional = isOptional;
    //     // validate[func].isNullable = isNullable;
    //     // validate[func].isUndefinable = isUndefinable;
    // });

    defineProperty(validate, 'typeName', typeName);
    defineProperty(validate, 'isOptional', isOptional);
    // validate.typeName = typeName;
    // validate.isOptional = isOptional;

    // ***
    // validate.isNullable = isNullable;
    // validate.isUndefinable = isUndefinable;

    return validate;
}
