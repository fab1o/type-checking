import Check from 'check-types';

import { stringify } from '../../util';

/**
 *
 * @param {*} type Type.
 * @param {Boolean} [useStrigify=false] Whether it should use JSON.strigify for objects.
 * @desc Gets the type name as a String, ie: string, array, function, object or class instance.
 * @returns {String}
 *
 */
export function getValueName(type, useStrigify = false) {
    if (Check.not.assigned(type)) {
        return `${type}`;
    }

    if (Check.string(type)) {
        return `a String: "${type}"`;
    }

    if (Check.number(type)) {
        return `a Number: ${type}`;
    }

    if (Check.boolean(type)) {
        return `a Boolean: ${type}`;
    }

    if (Check.array(type)) {
        return `an Array: ${stringify(type, 2)}`;
    }

    let typeName;

    if (Check.function(type)) {
        typeName = `${type.prototype}`;

        if (typeName === '[object Object]') {
            typeName = type.name;
        }
    } else {
        typeName = `${type}`;
    }

    if (typeName === '[object Object]' || typeName === '[object Array]') {
        if (Check.function(type.constructor)) {
            typeName = type.constructor.name;
        }

        if (
            typeName === '[object Object]' ||
            typeName === '[object Array]' ||
            typeName === 'Object'
        ) {
            if (useStrigify) {
                typeName = `an Object: ${stringify(type, 2)}`;
            } else {
                typeName = 'an Object';
            }
        }
    }

    return typeName;
}
