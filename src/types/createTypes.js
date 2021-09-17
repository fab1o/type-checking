import { defineProperty } from '../util/defineProperty';

import { Asserts } from './asserts';
import { Type } from './type';

// /**
//  * @desc Transform an array of assert names to Assert objects
//  * @param {Array<String>} arrayAsserts
//  * @returns {Object}
//  */
// function createAsserts(arrayAsserts) { ***
//     let objAsserts;

//     if (arrayAsserts) {
//         objAsserts = {};

//         arrayAsserts.forEach((a) => {
//             objAsserts[a] = Asserts[a];
//         });
//     }

//     return objAsserts;
// }

/**
 * @param {Boolean} isArray
//  * @param {Object} [options]
//  * @param {Object} [options.asserts=Asserts] - Asserts object.
//  * @param {Boolean} [options.exitArrayLoop=false] - Flag used to prevent 3 levels of Types.array.of.Types.
//  * @param {String} [options.arrayOfType=null] - "array" or "nonEmptyArray".
 * @desc Creates Types object.
 * @returns {Object} Types object.
 */
// export function createTypes(options = {}) {
//     const { asserts = Asserts, exitArrayLoop = false, arrayOfType = null } = options;
export function createTypes(isArray) {
    const types = {};

    // Object.keys(asserts).forEach((assertName) => {
    //     const assertProps = asserts[assertName];
    Asserts.forEach((assert) => {
        const { assertName, isArrayable } = assert;

        if (isArray && isArrayable === false) {
            return;
        }

        // ***
        // let andAsserts, orAsserts;
        //
        // if (arrayOfType == null) {
        //     andAsserts = createAsserts(assert.andAsserts);
        //     orAsserts = createAsserts(assert.orAsserts);
        // }

        const type = new Type(assertName, {
            ...assert,
            // ***
            // andAsserts,
            // orAsserts,
            // arrayOfType
            isArray
        });

        defineProperty(types, assertName, type.createValidator());

        if (assertName === 'array') {
            // exit recursion, array.of.array.of.x is not supported
            // ***
            // if (exitArrayLoop) {
            //     return;
            // }
            if (isArray) {
                return;
            }

            // ***
            // types.array.of = createTypes({
            //     exitArrayLoop: true,
            //     arrayOfType: assertName
            // });
            defineProperty(types.array, 'of', createTypes(true));
        }

        // ***
        // if (assertName === 'nonEmptyArray') {
        //     // exit recursion, nonEmptyArray.of.nonEmptyArray.of.x is not supported
        //     if (exitArrayLoop) {
        //         return;
        //     }
        //
        //     types.nonEmptyArray.of = createTypes({
        //         exitArrayLoop: true,
        //         arrayOfType: assertName
        //     });
        // }
    });

    return types;
}
