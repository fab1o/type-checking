// ***
// import { validateParams } from './validateParams';

// /**
//  * @param {Array<Object<TypeChecking.Type>>} args - List of params object built with Types.
//  * @desc Extends multiple params objects.
//  * @throws {TypeError} When params is not an object built with Types.
//  * @returns {Object<TypeChecking.Type>}
//  */
// export function extendParams(...args) {
//     const isValid = args.every((params) => validateParams(params));

//     if (isValid === false) {
//         throw TypeError(
//             `extendParams(...params) params expected an Object built with Types.`
//         );
//     }

//     return args.reduce((base, derived) => ({ ...base, ...derived }), {});
// }
