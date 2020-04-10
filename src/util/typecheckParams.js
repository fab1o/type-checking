import Check from 'check-types';

import { Config } from '../config';
import { getUserInputType, UserInputTypes } from './getUserInputType';

/**
 *
 * @param {Array|Object} input The user input.
 * @param {Number} i The index in user input.
 * @param {String} name The name of a property in user input.
 * @desc Gets the user input value: Step 2 of typecheckParams.
 * @throws {Error} Internal failure.
 * @returns {*} The respective value in user input.
 *
 *
 */
function getValue(input, i, name) {
    const inputType = getUserInputType(input);

    switch (inputType) {
        case UserInputTypes.arguments:
            return input[i];

        case UserInputTypes.object:
            return input[name];

        default:
            // it should never get to this point
            throw new Error('typecheckParams() error in step2.');
    }
}

/**
 *
 * @param {Object} options
 * @param {Array|Object} options.input The user input.
 * @param {Object<TypeChecking.Type>} options.params Params object built with Types.
 * @param {TypeChecking.MessageBuilder.MessageBuilder} options.messageBuilder MessageBuilder object.
 * @param {TypeChecking.MessageBuilder.Param} [options.parent] The parent param.
 * @param {Error} [options.ErrorType=Config.Error] The Error type to throw.
 * @param {Boolean} [isOneOfRequired=false] Whether or not to check if at least one is provided (even thou they are all optional).
 * @desc Validates params built with Types against user input.
 *
 */
export function typecheckParams(options) {
    const {
        input,
        params,
        messageBuilder,
        parent,
        ErrorType = Config.Error,
        isOneOfRequired = false
    } = options;

    let isProvided = false;

    Object.keys(params).forEach((name, paramIndex) => {
        // step 1: get the validator function
        const paramValidate = params[name];

        // step 2: get the value: "non-options" params versus "options" param
        const value = getValue(input, paramIndex, name);

        // step 3: setParam so it can include the param name in the error message
        messageBuilder.setParam(name, parent);

        // step 4: invoke type's validate function
        paramValidate({ value, messageBuilder, paramIndex, input, ErrorType });

        // step 5 (optional): check if value is provided.
        if (Check.assigned(value)) {
            isProvided = true;
        }
    });

    // step 6 (optional): throw error is non is provided.
    if (isOneOfRequired) {
        const errorMessage = messageBuilder.buildCustomMessage(
            'at least one parameter must be provided'
        );

        Check.assert(isProvided, errorMessage, ErrorType);
    }
}
