/**
 * Reflection library - getArgumentValueName
 *
 * Use this function for:
 *   - arguments in Types
 */

import { getValueName } from './getValueName';

/**
 * @param {*} value Any value.
 * @desc Gets the value name as a String.
 * @returns {String}
 */
export function getArgumentValueName(value) {
    return getValueName(value, {
        includeTypeName: false
    });
}
