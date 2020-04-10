/* eslint-disable no-control-regex, no-misleading-character-class, no-case-declarations */
// based on https://github.com/douglascrockford/JSON-js/blob/master/json2.js

const rxEscapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
const meta = {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '\\': '\\\\'
};

function str(key, holder, maxLevel = 0) {
    let i, v, length, partial;
    let value = holder[key];

    if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
        value = value.toJSON(value);
    }

    switch (typeof value) {
        case 'string':
            rxEscapable.lastIndex = 0;
            if (rxEscapable.test(value)) {
                return `"${value.replace(rxEscapable, (a) => {
                    const c = meta[a];

                    if (typeof c === 'string') {
                        return c;
                    }

                    return `\\u${`0000${a.charCodeAt(0).toString(16)}`.slice(-4)}`;
                })}"`;
            }

            return `"${value}"`;

        case 'number':
            return Number.isFinite(value) ? String(value) : 'null';

        case 'boolean':
            return String(value);

        case 'object':
            if (!value) {
                return 'null';
            }

            if (maxLevel === -1) {
                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    return value.length > 0 ? '[...]' : '[]';
                }

                return Object.keys(value).length > 0 ? '{...}' : '{}';
            }

            partial = [];

            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length && (maxLevel === 0 || i < maxLevel); i++) {
                    partial[i] = str(i, value, -1) || 'null';
                }

                if (partial.length === 0) {
                    v = '[]';
                } else {
                    v = `[${partial.join(', ')}`;

                    if (maxLevel > 0 && length > maxLevel) {
                        v += ', ...]';
                    } else {
                        v += ']';
                    }
                }

                return v;
            }

            const keys = Object.keys(value);

            length = keys.length;

            for (i = 0; i < length && (maxLevel === 0 || i < maxLevel); i++) {
                const kk = keys[i];

                if (Object.prototype.hasOwnProperty.call(value, kk)) {
                    v = str(kk, value, -1);
                    if (v) {
                        partial.push(`${kk}:${v}`);
                    }
                }
            }

            if (partial.length === 0) {
                v = '{}';
            } else {
                v = `{${partial.join(', ')}`;

                if (maxLevel > 0 && length > maxLevel) {
                    v += ', ...}';
                } else {
                    v += '}';
                }
            }

            return v;
        default:
            return '';
    }
}

/**
 *
 * @param {Object|Array} value The object or array.
 * @param {Number} [maxLevel] Max number of nodes to stringify.
 * @desc Stringify an object.
 * @returns {String}
 *
 */
export function stringify(value, maxLevel) {
    return str('', { '': value }, maxLevel);
}
