// ***
// import Check from '@fab1o/check-types';

// import { Types, Type } from './types';
// import { createCustomValidator, getArgumentValueName } from './util';

// /**
//  * @param {String} name - Type name.
//  * @param {Function} validator - Custom function that validates input, must return boolean.
//  * @param {Object} [options]
//  * @param {String} [options.assert=name] - Type assert.
//  * @param {String} [options.singular=name] - Name in singular.
//  * @param {String} [options.plural=name+'s'] - Name in plural.
//  * @param {Boolean} [options.expectArgs=false] - Whether type expects an argument or not.
//  * @param {Boolean} [options.autoDisplayArgs=true] - Whether or not automatically display arguments.
//  * @param {Function} [options.stringifyArgs=getArgumentValueName] - A stringify function for the expected arguments of this type.
//  * @desc Creates a user defined type and adds it to Types object.
//  * @throws {TypeError} When a parameter is invalid.
//  * @example
//  * const isBlueberry = (a) => String(a) === 'blueberry';
//  *
//  * addType('blueberry', isBlueberry, {
//  *   singular: 'a Blueberry',
//  *   plural: 'blueberries'
//  * });
//  *
//  * const params = {
//  *    blueberry: Types.blueberry,
//  *    blueberries: Types.array.of.blueberry,
//  *    maybeBlueberry: Types.blueberry.optional,
//  *    maybeBlueberries: Types.array.of.blueberry.optional
//  * };
//  */
// export function addType(name, validator, options = {}) {
//     const signature = 'addType(name, validator, options)';

//     if (Check.not.nonEmptyString(name)) {
//         throw TypeError(`${signature} name expected a non-empty String.`);
//     }

//     if (Check.assigned(Types[name])) {
//         throw TypeError(
//             `${signature} name expected a type name that does not already exist in Types.`
//         );
//     }

//     if (Check.not.function(validator)) {
//         throw TypeError(`${signature} validator expected a Function that returns boolean.`);
//     }

//     if (Check.not.object(options)) {
//         throw TypeError(`${signature} options expected an Object or undefined.`);
//     }

//     const stringifyArgs = options.stringifyArgs ?? getArgumentValueName;
//     const expectArgs = options.expectArgs ?? false;
//     const autoDisplayArgs = options.autoDisplayArgs ?? true;

//     const type = new Type(name, {
//         ...options,
//         stringifyArgs,
//         expectArgs,
//         autoDisplayArgs
//     });

//     Types[name] = createCustomValidator(type, validator, options.singular);

//     const arrayOfType = new Type(name, {
//         ...options,
//         // arrayOfType: 'array'
//         isArray: true
//     });

//     Types.array.of[name] = createCustomValidator(arrayOfType, validator, options.plural);

//     // ***
//     // const nonEmptyArrayOfType = new Type(name, {
//     //     ...options,
//     //     arrayOfType: 'nonEmptyArray'
//     // });
//     //
//     // Types.nonEmptyArray.of[name] = createCustomValidator(
//     //     nonEmptyArrayOfType,
//     //     validator,
//     //     options.plural
//     // );
// }
