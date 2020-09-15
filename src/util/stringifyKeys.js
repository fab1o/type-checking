/**
 * @param {Object} obj Object.
 * @desc Stringify the Object keys.
 * @returns {String}
 */
export function stringifyKeys(obj) {
    return Object.keys(obj).map((key) => `"${key}"`);
}
