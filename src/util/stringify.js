/* eslint-disable no-control-regex, no-misleading-character-class, no-case-declarations */
import { getTypeToString } from './getTypeToString';

/**
 * @note Our custom stringify method replaces JSON.stringify to produce strings according to our type-checking error message style.
 * @note Any changes to the style, should be done here.
 */

const rxEscapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
const meta = {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '"',
    '\\': '\\\\'
};

/**
 * @access private
 * @param {String} value
 * @desc Formats strings with quotes and removes special characters.
 * @returns {String}
 */
function parseString(value) {
    rxEscapable.lastIndex = 0;

    if (rxEscapable.test(value)) {
        return `"${value.replace(rxEscapable, (a) => {
            const char = meta[a];

            if (typeof char === 'string') {
                return char;
            }

            return `\\u${`0000${a.charCodeAt(0).toString(16)}`.slice(-4)}`;
        })}"`;
    }

    return `"${value}"`;
}

/**
 * @access private
 * @param {Array} array
 * @param {String} [maxNodes=0] - Number of deep nodes to stringify an array.
 * @desc Stringifies arrays.
 * @returns {String}
 */
function stringifyArray(array, maxNodes = 0) {
    if (maxNodes === -1) {
        return array.length > 0 ? '[...]' : '[]';
    }

    let i, val;

    const partial = [];

    for (i = 0; i < array.length && (maxNodes === 0 || i < maxNodes); i++) {
        const value = array[i];

        partial[i] = stringify(value, -1) || 'null';
    }

    if (partial.length === 0) {
        val = '[]';
    } else {
        val = `[${partial.join(', ')}`;

        if (maxNodes > 0 && array.length > maxNodes) {
            val += ', ...]';
        } else {
            val += ']';
        }
    }

    return val;
}

/**
 * @access private
 * @param {Object} obj
 * @param {String} [maxNodes=0] - Number of deep nodes to stringify an object.
 * @desc Stringifies objects.
 * @returns {String}
 */
function stringifyObject(obj, maxNodes = 0) {
    if (maxNodes === -1) {
        return Object.keys(obj).length > 0 ? '{...}' : '{}';
    }

    let i, val;

    const partial = [];

    const keys = Object.keys(obj);

    for (i = 0; i < keys.length && (maxNodes === 0 || i < maxNodes); i++) {
        const kk = keys[i];

        if (Object.prototype.hasOwnProperty.call(obj, kk)) {
            const value = obj[kk];

            val = stringify(value, -1);

            if (val) {
                partial.push(`${kk}:${val}`);
            }
        }
    }

    if (partial.length === 0) {
        val = '{}';
    } else {
        val = `{${partial.join(', ')}`;

        if (maxNodes > 0 && keys.length > maxNodes) {
            val += ', ...}';
        } else {
            val += '}';
        }
    }

    return val;
}

/**
 * @param {*} value - Any value.
 * @param {Number} [maxNodes=2] - Number of deep nodes to stringify an object.
 * @desc Stringify any value.
 * @returns {String} Value stringified.
 */
export function stringify(value, maxNodes = 2) {
    switch (typeof value) {
        case 'string':
            return parseString(value);

        case 'boolean':
        case 'number':
        case 'undefined':
            return String(value);

        case 'function':
            return getTypeToString(value);

        case 'object':
            if (value == null) {
                return 'null';
            }

            switch (value.constructor?.name) {
                case 'Boolean':
                case 'Number':
                    return String(value.valueOf());

                // special cases
                case 'Array':
                    return stringifyArray(value, maxNodes);

                case 'Object':
                    return stringifyObject(value, maxNodes);

                case 'String':
                    return parseString(value.valueOf());

                default:
                    if (typeof value.toJSON === 'function') {
                        return parseString(value.toJSON());
                    }

                    // special types of objects or objects without a contructor
                    if (typeof value.toString === 'function') {
                        const strValue = value.toString();

                        if (strValue !== '' && strValue.indexOf('[object') === -1) {
                            return strValue;
                        }
                    }

                    return stringifyObject(value, maxNodes);
            }

        default:
            return '';
    }
}
