import { getUserInputType, UserInputType } from './getUserInputType';

/**
 * @param {Array|Object} input - The user input.
 * @param {Number} paramIndex - The index in user input.
 * @param {String} name - The name of a property in user input.
 * @desc Gets the user input value: Step 2 of typecheckParams.
 * @throws {ReferenceError} Internal failure.
 * @returns {*} The respective value in user input.
 */
export function getValue(input, paramIndex, name) {
    // we must get the input type here
    const inputType = getUserInputType(input);

    switch (inputType) {
        case UserInputType.arguments:
            return input[paramIndex];

        case UserInputType.object:
            return input[name];

        default:
            // it should never get to this point. A user input must be either arguments or an options object,
            // and it's enforced on ./typecheck/util/validateArguments.js
            throw ReferenceError('typecheckParams(...) error in step2.');
    }
}
