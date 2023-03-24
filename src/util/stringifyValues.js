import { stringify } from './stringify';

/**
 * @param {Object} obj Object.
 * @desc Stringify the Object values.
 * @returns {String}
 */
export function stringifyValues(obj) {
    return Object.values(obj).map((v) => stringify(v));
}
