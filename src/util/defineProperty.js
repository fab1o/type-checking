/**
 * @param {Object} obj
 * @param {String} propName
 * @param {*} value
 * @desc Defines a property for an object.
 */
export function defineProperty(obj, propName, value) {
    Object.defineProperty(obj, propName, {
        value,
        writable: false,
        configurable: false
    });
}
