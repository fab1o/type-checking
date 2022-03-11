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

function objectify(value, maxNodes) {
    if (maxNodes === -1) {
        if (Array.isArray(value)) {
            return value.length > 0 ? '[...]' : '[]';
        }

        return Object.keys(value).length > 0 ? '{...}' : '{}';
    }

    let i, val, length;

    const partial = [];

    if (Array.isArray(value)) {
        length = value.length;
        for (i = 0; i < length && (maxNodes === 0 || i < maxNodes); i++) {
            partial[i] = str(i, value, -1) || 'null';
        }

        if (partial.length === 0) {
            val = '[]';
        } else {
            val = `[${partial.join(', ')}`;

            if (maxNodes > 0 && length > maxNodes) {
                val += ', ...]';
            } else {
                val += ']';
            }
        }

        return val;
    }

    const keys = Object.keys(value);

    length = keys.length;

    for (i = 0; i < length && (maxNodes === 0 || i < maxNodes); i++) {
        const kk = keys[i];

        if (Object.prototype.hasOwnProperty.call(value, kk)) {
            val = str(kk, value, -1);
            if (val) {
                partial.push(`${kk}:${val}`);
            }
        }
    }

    if (partial.length === 0) {
        val = '{}';
    } else {
        val = `{${partial.join(', ')}`;

        if (maxNodes > 0 && length > maxNodes) {
            val += ', ...}';
        } else {
            val += '}';
        }
    }

    return val;
}

function strVal(value, maxNodes = 0) {
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
                case 'Date':
                    return value.toISOString();

                case 'Array':
                case 'Object':
                    return objectify(value, maxNodes);

                case 'Boolean':
                case 'Number':
                    return String(value.valueOf());

                case 'String':
                    return parseString(value.valueOf());

                default:
                    // special types of objects or objects without a contructor
                    try {
                        if (typeof value.toString === 'function') {
                            const strValue = value.toString();

                            if (strValue !== '' && strValue.indexOf('[object') === -1) {
                                return strValue;
                            }
                        }

                        return objectify(value, maxNodes);
                    } catch {}

                    return '';
            }

        default:
            return '';
    }
}

function str(key, holder, maxNodes = 0) {
    let value = holder[key];

    if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
        value = value.toJSON(value);
    }

    return strVal(value, maxNodes);
}

/**
 * @param {*} value - Any value.
 * @param {Number} [maxNodes=2] - Max number of nodes to stringify.
 * @desc Stringify any value.
 * @returns {String} Value stringified.
 */
export function stringify(value, maxNodes = 2) {
    return str('', { '': value }, maxNodes);
}
