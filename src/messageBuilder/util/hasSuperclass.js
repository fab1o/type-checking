/**
 *
 * @param {Object} obj An object to check.
 * @desc Checks if an obj inherits from a superclass.
 * @returns {Boolean}
 *
 */
export function hasSuperclass(obj = null) {
    const child = obj != null ? Object.getPrototypeOf(obj) : null;
    const parent = child != null ? Object.getPrototypeOf(child) : null;
    const superclass = parent != null ? Object.getPrototypeOf(parent) : null;

    return superclass != null;
}
