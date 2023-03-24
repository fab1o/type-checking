/**
 * Reflection library - getTypeName
 *
 * Use this function for:
 *   - String (dev custom defined name)
 *   - Function (as function/method or class definition)
 *   - Object (or class instance)
 */

import { Check } from '@fab1o/check-types';

// #region private
/**
 * @param {String} typeName - Type name.
 * @desc Whether type name is valid.
 * @returns {Boolean}
 */
function isValid(typeName) {
    return typeName !== '' && typeName.indexOf('[object') === -1;
}

/**
 * @param {Function} type - Type function.
 * @desc Gets the type name from toString first, then use name property.
 * @returns {String}
 */
function funcToString(type) {
    let typeName = '';

    // do not use toString for primitive types
    switch (type) {
        case Date:
        case String:
        case Number:
        case Boolean:
            typeName = type.name;
            break;
        default:
            if (Check.function(type.prototype?.toString)) {
                try {
                    // prevent possible errors like Illegal invocation or called on incompatible receiver
                    typeName = type.prototype.toString();
                } catch {}
            }
    }

    if (isValid(typeName)) {
        return typeName;
    }

    // type.name is empty if the function is an anonymous function
    return type.name || 'a Function';
}

/**
 * @param {Object} type - Type object.
 * @desc Gets the type name from toString first, then use name property.
 * @returns {String}
 */
function objToString(type) {
    let typeName = '';

    try {
        typeName = type.toString();
    } catch {}

    if (isValid(typeName)) {
        return typeName;
    }

    // use its own constructor name if exists
    return type.constructor?.name || 'an Object';
}
// #endregion

/**
 * @param {Function|Object|String} type - Type function or object or string.
 * @param {String} [defaultVal] - Default value in case given type is invalid.
 * @desc Gets the type name of a Function, Object/Class or String, or defaultVal if given type is invalid.
 * @returns {String}
 */
export function getTypeToString(type, defaultVal) {
    if (Check.not.assigned(type) || Number.isNaN(type)) {
        return Check.string(defaultVal) ? defaultVal : String(type);
    }

    // type will always be one of:
    // 1. String (dev custom defined name)
    // 2. Function (as function/method or class definition)
    // 3. Object (or class instance)

    if (Check.string(type)) {
        return type;
    }

    if (Check.function(type)) {
        return funcToString(type);
    }

    return objToString(type);
}
