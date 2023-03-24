import { getUserArgumentsType, UserArgumentsType } from './getUserArgumentsType';

/**
 * @param {Array|Object} userData - The data to be validated.
 * @param {Number} paramIndex - The index in user user arguments.
 * @param {String} name - The name of a property in user arguments.
 * @desc Gets the user arguments value.
 * @throws {ReferenceError} Internal failure.
 * @returns {*} The respective value in user userArguments.
 */
export function getValue(userData, paramIndex, name) {
    // get the user arguments type
    const inputType = getUserArgumentsType(userData);

    switch (inputType) {
        case UserArgumentsType.array:
            return userData[paramIndex];

        case UserArgumentsType.object:
            return userData[name];

        default:
            // it should never get to this point
            // userArguments must be either array or object
            // enforced on validateArguments.js
            throw ReferenceError('typecheckParams(...) error in step2.');
    }
}
