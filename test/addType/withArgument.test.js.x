// import { Types, typecheck, addType } from '../../src';

// /**
//  * a type where number is wither any given number as arguments to the type
//  *
//  * Types.any(args):
//  *   (value, input, args) => args.find((arg) => arg === value);
//  *
//  * Types.any(1, 2):
//  *   (value, input, args) => Number(value) === 1 || Number(value) === 2
//  *
//  * Types.any(3, 5, 7):
//  *   (value, input, args) => Number(value) === 3 || Number(value) === 5 || Number(value) === 7
//  */

// function checkForNumber() {
//     typecheck(
//         {
//             number: Types.any(3, 5, 7)
//         },
//         arguments
//     );
// }

// function checkForOptionalNumber() {
//     typecheck(
//         {
//             number: Types.any(3, 5, 7).optional
//         },
//         arguments
//     );
// }

// function checkForNullableNumber() {
//     typecheck(
//         {
//             number: Types.any(3, 5, 7).nullable
//         },
//         arguments
//     );
// }

// function checkForNumbers() {
//     typecheck(
//         {
//             numbers: Types.array.of.any(3, 5, 7)
//         },
//         arguments
//     );
// }

// function checkForNullableNumbers() {
//     typecheck(
//         {
//             numbers: Types.array.of.any(3, 5, 7).nullable
//         },
//         arguments
//     );
// }

// function checkForOptionalNumbers() {
//     typecheck(
//         {
//             numbers: Types.array.of.any(3, 5, 7).optional
//         },
//         arguments
//     );
// }

// describe('addType - without argument', () => {
//     const isAny = (value, ...args) => !!args.find((arg) => arg === value);

//     addType('any', isAny, {
//         singular: 'a value that is {a}, {b} or {c}',
//         plural: 'values that are {a}, {b} or {c}',
//         expectArgs: true
//     });

//     it('uses type any to check for a Number sucessfully', () => {
//         expect(() => {
//             checkForNumber(3);
//         }).not.toThrow();
//     });

//     it.skip('uses type any to check for a nullable Number sucessfully', () => {
//         expect(() => {
//             checkForNullableNumber(null);
//         }).not.toThrow();
//     });

//     it('uses type any to check for an optional Number sucessfully', () => {
//         expect(() => {
//             checkForOptionalNumber();
//         }).not.toThrow();
//     });

//     it('uses type any to check for an array of numbers sucessfully', () => {
//         expect(() => {
//             checkForNumbers([3, 5]);
//         }).not.toThrow();
//     });

//     it.skip('uses type any to check for nullable array of numbers sucessfully', () => {
//         expect(() => {
//             checkForNullableNumbers(null);
//         }).not.toThrow();
//     });

//     it('uses type any to check for an optional array of numbers sucessfully', () => {
//         expect(() => {
//             checkForOptionalNumbers();
//         }).not.toThrow();
//     });

//     it('uses type any to check for a Number unsucessfully', () => {
//         expect(() => {
//             checkForNumber(null);
//         }).toThrow('{number} number expected a value that is 3, 5 or 7 but received null.');
//     });

//     it('uses type array.of.any to check for a numbers unsucessfully', () => {
//         expect(() => {
//             checkForNumbers(null);
//         }).toThrow(
//             '{numbers} numbers expected an Array of values that are 3, 5 or 7 but received null.'
//         );
//     });

//     it('uses type array.of.any to check for a list of numbers unsucessfully', () => {
//         expect(() => {
//             checkForNumbers([3, null]);
//         }).toThrow(
//             '{numbers} numbers expected an Array of values that are 3, 5 or 7 but received an Array: [3, null].'
//         );
//     });
// });
