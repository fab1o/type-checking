import { Check } from '@fab1o/check-types';

/**
 *
 * @param {*} value - User input value.
 * @param {TypeChecking.Type} type - Type.
 * @param {Array<*>} [expectedArgs] - What values are expected for this type.
 * @returns {Boolean}
 */
export function isValueOk(value, type, ...expectedArgs) {
    // const { assert, isArray, arrayOfType, validator } = type;
    const { assert, isArray, validator } = type;

    let isOk = true;

    if (Check.function(validator)) {
        if (isArray) {
            // check for array or nonEmptyArray
            // isOk = Check.assert[arrayOfType](value); ***
            isOk = Check.assert.array(value);
            if (isOk) {
                value.forEach((val) => {
                    isOk = isOk && validator(val, ...expectedArgs);
                });
            }
        } else {
            isOk = validator(value, ...expectedArgs);
        }

        return isOk;
    }

    if (isArray) {
        // if (arrayOfType === 'nonEmptyArray') { ***
        //     isOk = Check.nonEmptyArray(value);
        // }
        isOk = isOk && Check.array.of[assert](value, ...expectedArgs);
    } else {
        isOk = Check[assert](value, ...expectedArgs);
    }

    return isOk;
}
