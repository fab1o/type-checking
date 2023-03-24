import { Check } from '@fab1o/check-types';

/**
 * @param {*} input User input.
 * @desc Whether or not input is a valid user input.
 * @returns {Boolean}
 */
export function isUserInput(input) {
    return (Check.arrayLike(input) && Check.not.string(input)) || Check.object(input);
}
