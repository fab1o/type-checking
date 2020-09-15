import { Asserts } from './asserts';
import { Type } from './type';

/**
 * @param {Object} [options]
 * @param {Object} [options.asserts=Asserts] Asserts object.
 * @param {Boolean} [options.isArray=false] Whether type is part of "array.of" or not.
 * @desc Creates Types object.
 * @returns {Object} Types object.
 */
function createTypes(options = {}) {
    const { asserts = Asserts, isArray = false } = options;

    const types = {};

    Object.keys(asserts).forEach((assertName) => {
        const assertProps = asserts[assertName];

        const type = new Type(assertName, {
            isArray,
            ...assertProps
        });

        Object.defineProperty(types, assertName, {
            value: type.createValidator(),
            writable: false,
            configurable: false
        });

        if (assertName === 'array') {
            if (isArray) {
                return; // exit recursion, array.of.array.of.array is not supported
            }

            Object.defineProperty(types.array, 'of', {
                value: createTypes({ isArray: true }),
                writable: false,
                configurable: false
            });
        }
    });

    return types;
}

/**
 * @access public
 * @typedef {Object<TypeChecking.Type>} TypeChecking.Types
 * @desc Contains all types used to setup the params object used by typecheck.
 *
 */
export const Types = createTypes();
