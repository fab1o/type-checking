import Check from '@fab1o/check-types';

/**
 * @enum {String}
 * @typedef {Object} UserInputType
 * @property {String} object 'object' - An Object.
 * @property {String} arguments 'arguments' - JavaScript arguments.
 * @property {String} none 'none' - Neither Object nor arguments.
 */
export const UserInputType = {
    object: 'object',
    arguments: 'arguments',
    none: 'none'
};

/**
 * @param {*} input User input.
 * @desc Gets the type of user input that was given.
 * @returns {UserInputType}
 */
export function getUserInputType(input) {
    // Due to how check-types considers an object that has a length prop to be an arrayLike,
    // the order of IFs must be the following:
    // 1) check for an object
    // 2) check for an arrayLike
    // Do not change this order!
    if (Check.object(input)) {
        return UserInputType.object;
    }
    if (Check.arrayLike(input) && Check.not.string(input)) {
        return UserInputType.arguments;
    }

    return UserInputType.none;
}
