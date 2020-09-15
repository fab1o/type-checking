/**
 * Reflection library - getTypeName
 *
 * Use this function for:
 *   - String (dev custom defined name)
 *   - Function (as function/method or class definition)
 *   - Object (or class instance)
 */

import Check from '@fab1o/check-types';

import { Config } from '../config';

// #region private
/**
 * MAX_LEN = Arbitrary value to indicate max length for a type name via toString()
 *           in case the user modifies the toString
 *           if toString().length is more than MAX_LEN, consider not a valid name
 *
 * NOT_OVERRIDDEN = Indicates toString() is from parent Object
 */
const MAX_LEN = 128;
const NOT_OVERRIDDEN = '[object Object]';

/**
 * @param {Function|Object} type Type.
 * @desc Gets the type name from toString first, then use name property.
 * @returns {String}
 */
function toString(type) {
    return Check.function(type) ? funcToString(type) : objToString(type);
}

/**
 * @param {Function|Object} type Type.
 * @desc Gets the type name from name property first, then use toString.
 * @returns {String}
 */
function name(type) {
    return Check.function(type) ? funcName(type) : objName(type);
}

/**
 * @param {Function} type Type.
 * @desc Gets the type name from toString first, then use name property.
 * @returns {String}
 */
function funcToString(type) {
    let typeName = '';

    if (type.prototype && type.prototype.toString) {
        typeName = type.prototype.toString() || '';
    }

    if (typeName === '' || typeName === NOT_OVERRIDDEN || typeName.length > MAX_LEN) {
        typeName = type.name;
    }

    return typeName || '';
}

/**
 * @param {Function} type Type.
 * @desc Gets the type name from name property first, then use toString.
 * @returns {String}
 */
function funcName(type) {
    return type.name || funcToString(type);
}

/**
 * @param {Object} type Type.
 * @desc Gets the type name from toString first, then use name property.
 * @returns {String}
 */
function objToString(type) {
    let typeName = type.toString() || '';

    if (typeName === '' || typeName === NOT_OVERRIDDEN || typeName.length > MAX_LEN) {
        // use its own constructor name if exists
        if (Check.function(type.constructor)) {
            typeName = type.constructor.name;
        } else {
            typeName = null;
        }
    }

    return typeName || 'Object';
}

/**
 * @param {Object} type Type.
 * @desc Gets the type name from name property first, then use toString.
 * @returns {String}
 */
function objName(type) {
    let typeName = null;

    // use its own constructor name if exists
    if (Check.function(type.constructor)) {
        typeName = type.constructor.name;
    }

    return typeName || objToString(type);
}
// #endregion

/**
 * @param {Function|Object|String} type Type.
 * @param {String} [defaultVal] Default value in case given type is invalid.
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

    if (Check.string(type)) {
        return type;
    }

    if (Config.nameMethodPriority === Config.NameMethod.toString) {
        return toString(type);
    }

    return name(type);
}
