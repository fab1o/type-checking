// ***
/**
 * Reflection library - getTypeName
 *
 * Use this function for:
 *   - String (dev custom defined name)
 *   - Function (as function/method or class definition)
 *   - Object (or class instance)
 */

import { Check } from '@fab1o/check-types';

import { getTypeToString } from './getTypeToString';

// #region private

/**
 * @param {Function} type - Type function.
 * @desc Gets the type name from name property first, then use toString.
 * @returns {String}
 */
function funcName(type) {
    // use its own name if exists
    return type.name || getTypeToString(type);
}

/**
 * @param {Object} type - Type object.
 * @desc Gets the type name from name property first, then use toString.
 * @returns {String}
 */
function objName(type) {
    // use its own constructor name if exists
    return type.constructor?.name || getTypeToString(type);
}
// #endregion

/**
 * @param {Function|Object|String} type - Type function or object or string.
 * @param {String} [defaultVal] - Default value in case given type is invalid.
 * @desc Gets the type name of a Function, Object/Class or String, or defaultVal if given type is invalid.
 * @returns {String}
 */
export function getTypeName(type, defaultVal) {
    if (Check.not.assigned(type) || Number.isNaN(type)) {
        return Check.string(defaultVal) ? defaultVal : String(type);
    }

    // type will always be one of:
    // 1. String (dev custom defined name)
    // 2. Function (as function/method or class definition)
    // 3. Object (or class instance)

    // if (Check.string(type)) {
    //     return type;
    // }

    if (Check.function(type)) {
        return funcName(type);
    }

    return objName(type);
}
