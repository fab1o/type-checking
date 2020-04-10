/**
 *
 * @param {Object} obj Object
 * @desc List the Object keys
 * @returns {String}
 *
 */
export function stringifyKeys(obj) {
    return Object.keys(obj).map((key) => `"${key}"`);
}
