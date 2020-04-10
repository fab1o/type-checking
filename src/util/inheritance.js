import Check from 'check-types';

/**
 *
 * @param {*} type Type to check.
 * @param {*} superType Super or parent type.
 * @desc Checks if a given type inherits from another type.
 * @returns {Boolean}
 *
 */
export function inheritance(type, superType) {
    return Check.assigned(type) && type.prototype instanceof superType;
}
