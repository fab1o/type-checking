import { Check } from '@fab1o/check-types';

/**
 * @enum {String}
 * @type {Object} UserArgumentsType
 * @property {Number} object 'object' - Object.
 * @property {Number} array 'array' - JavaScript arguments or Array.
 * @property {Number} none 'none' - Neither Object nor Array.
 */
export const UserArgumentsType = {
    object: 1,
    array: 2,
    none: 0
};

/**
 * @param {*} userArguments - User arguments.
 * @desc Gets the type of user arguments that was given.
 * @returns {UserArgumentsType}
 */
export function getUserArgumentsType(userArguments) {
    // Due to how check-types considers an object that has a length prop to be an arrayLike,
    // the order of IFs must be the following:
    // 1) check for an object
    // 2) check for an arrayLike
    // Do not change this order!
    if (Check.object(userArguments)) {
        return UserArgumentsType.object;
    }
    if (Check.arrayLike(userArguments) && Check.not.string(userArguments)) {
        return UserArgumentsType.array;
    }

    return UserArgumentsType.none;
}
