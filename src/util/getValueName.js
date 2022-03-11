/**
 * Reflection library - getValueName
 *
 * Use this function for:
 *   - Any type of variable
 */

import Check from '@fab1o/check-types';

import { getArticle } from './getArticle';
import { getTypeName } from './getTypeName';
import { getTypeToString } from './getTypeToString';
import { stringify } from './stringify';

/**
 * @param {*} value - Any value.
 * @param {Object} [options]
 * @param {Boolean} [options.includeTypeName=false] - Whether it also includes the type name but this has no difference when value is function, object, null, undefined or NaN.
 * @desc Gets the value name as a String, ie: strings, numbers, booleans, functions or class definitions, objects or class instances or arrays, null, undefined, NaN, etc...
 * @returns {String}
 */
export function getValueName(value, options = {}) {
    const { includeTypeName = false } = options;

    // value === undefined || value === null || isNaN
    if (Check.not.assigned(value) || Number.isNaN(value)) {
        return String(value);
    }

    // typeof value === 'function'
    if (Check.function(value)) {
        return getTypeToString(value);
    }

    // toString.call(value) === '[object Object]'
    if (Check.object(value)) {
        const typeName = getTypeToString(value);

        // if simple object, do not return and let it stringify it below
        if (typeName !== 'Object' && typeName !== 'an Object') {
            return typeName;
        }
    }

    // value is anything but function, object (except simple object), null, undefined or NaN
    const valueName = stringify(value);

    if (includeTypeName) {
        const typeName = `${getArticle(value)}${getTypeName(value)}`;

        if (valueName) {
            return `${typeName}: ${valueName}`;
        }

        return typeName;
    }

    return valueName;
}
