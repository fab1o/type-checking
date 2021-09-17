/**
 * Reflection library - getValueName
 *
 * Use this function for:
 *   - Any type of variable
 */

import Check from '@fab1o/check-types';

import { getArticle } from './getArticle';
import { getTypeName } from './getTypeName';
import { stringify } from './stringify';

/**
 * @param {*} value Any value.
 * @param {Object} [options]
 * @param {Boolean} [options.includeStrigify=true] Whether it should present the value.
 * @param {Boolean} [options.includeTypeName=true] Whether it should present the type name.
 * @desc Gets the value name as a String, ie: strings, numbers, booleans, functions or class definitions, objects or class instances or arrays, null, undefined, NaN
 * @returns {String}
 */
export function getValueName(value, options = {}) {
    const { includeStrigify = true, includeTypeName = true } = options;

    // null, undefined, NaN
    if (Check.not.assigned(value) || Number.isNaN(value)) {
        return String(value);
    }

    // typeof === 'function'
    if (Check.function(value)) {
        const article = includeTypeName ? 'a ' : '';

        return getTypeName(value) || `${article}Function`;
    }

    // class instance only
    if (Check.object(value)) {
        const typeName = getTypeName(value);

        if (typeName !== 'Object') {
            return typeName;
        }
    }

    // primitives, Array and simple objects

    const typeName = includeTypeName ? `${getArticle(value)}${value.constructor.name}` : '';

    const valueStringified = includeStrigify ? stringify(value) : '';

    const colon = includeTypeName && includeStrigify && valueStringified ? ': ' : '';

    return `${typeName}${colon}${valueStringified}`;
}
