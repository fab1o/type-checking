import Check from 'check-types';

/**
 * @typedef {Object} UserInputTypes
 * @property {String} object Object.
 * @property {String} arguments JavaScript arguments or Rest parameter.
 * @property {String} none None.
 */
export const UserInputTypes = {
    object: 'object',
    arguments: 'arguments',
    none: 'none'
};

/**
 *
 * @param {*} input User input.
 * @desc Gets the type of user input that was given.
 * @returns {Boolean}
 *
 */
export function getUserInputType(input) {
    if (Check.arrayLike(input) && Check.not.string(input)) {
        return UserInputTypes.arguments;
    }
    if (Check.object(input)) {
        return UserInputTypes.object;
    }

    return UserInputTypes.none;
}
