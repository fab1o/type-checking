import Check from 'check-types';

/**
 *
 * @param {*} type Type.
 * @desc Gets the type name: Function, Object or Class name.
 * @returns {String}
 *
 */
export function getTypeName(type) {
    if (Check.not.assigned(type)) {
        return `${type}`;
    }

    let typeName;

    if (Check.function(type)) {
        typeName = type.prototype.toString();

        if (typeName === '[object Object]') {
            typeName = type.name;
        }
    } else {
        typeName = type.toString(); // object and class toString
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
            typeName = 'an Object';
        }
    }

    return typeName;
}
