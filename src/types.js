import { Type } from './type';
import { Methods } from './methods';
import { typeCreator } from './util';

/**
 *
 * @param {Object} [options]
 * @param {TypeChecking.Methods} [options.methods=Methods] Methods object.
 * @param {Boolean} [options.isArrayOf=false] whether part of "array.of" or not.
 * @param {Boolean} [options.isNullable=false] whether is nullable.
 * @desc Create Types object.
 * @returns {Object} Types object.
 *
 */
export function createTypes(options = {}) {
    const { methods = Methods, isArrayOf = false, isNullable = false } = options;
    const types = {};

    Object.keys(methods).forEach((assertFunc) => {
        const method = methods[assertFunc];

        try {
            const type = new Type({
                assertFunc,
                isNullable,
                isArrayOf,
                ...method
            });

            Object.defineProperty(types, assertFunc, {
                value: typeCreator(type)
            });
        } catch (ex) {}

        if (assertFunc === 'array') {
            if (isArrayOf) {
                return; // exit recursion, array.of.array.of.array is not supported
            }

            Object.defineProperty(types.array, 'of', {
                value: createTypes({ isArrayOf: true, isNullable })
            });
        }
    });

    if (isNullable === false) {
        Object.defineProperty(types, 'nullable', {
            value: createTypes({ isNullable: true })
        });
    }

    return types;
}

/**
 *
 * @typedef {Object<TypeChecking.Type>} TypeChecking.Types
 * @desc Contains all types used to setup the params object used by typecheck.
 *
 */
export const Types = createTypes();
