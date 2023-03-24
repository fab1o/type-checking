import { Check } from '@fab1o/check-types';

/**
 * @param {Object<TypeChecking.Type>} params Object built with Types.
 * @desc Whether or not params is an Object built with Types.
 * @returns {Boolean}
 */
export function isObjectTypes(params) {
    if (Check.nonEmptyObject(params)) {
        return Object.values(params).every((value) => {
            return Check.function(value) && Check.string(value.typeName);
        });
    }

    return false;
}
