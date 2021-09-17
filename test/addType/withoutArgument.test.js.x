// import { Types, typecheck, addType } from '../../src';

// /**
//  * a type where value is the word "blueberry"
//  *
//  * Types.blueberry:
//  *  (value, input, args) => String(input) === 'blueberry';
//  */

// function checkForBlueberry() {
//     typecheck(
//         {
//             blueberry: Types.blueberry
//         },
//         arguments
//     );
// }

// function checkForOptionalBlueberry() {
//     typecheck(
//         {
//             blueberry: Types.blueberry.optional
//         },
//         arguments
//     );
// }

// function checkForNullableBlueberry() {
//     typecheck(
//         {
//             blueberry: Types.blueberry.nullable
//         },
//         arguments
//     );
// }

// function checkForBlueberries() {
//     typecheck(
//         {
//             blueberries: Types.array.of.blueberry
//         },
//         arguments
//     );
// }

// function checkForNullableBlueberries() {
//     typecheck(
//         {
//             blueberries: Types.array.of.blueberry.nullable
//         },
//         arguments
//     );
// }

// function checkForOptionalBlueberries() {
//     typecheck(
//         {
//             blueberries: Types.array.of.blueberry.optional
//         },
//         arguments
//     );
// }

// function checkForNonEmptyArrayOfBlueberries() {
//     typecheck(
//         {
//             blueberries: Types.nonEmptyArray.of.blueberry
//         },
//         arguments
//     );
// }

// function checkForOptionalNonEmptyArrayOfBlueberries() {
//     typecheck(
//         {
//             blueberries: Types.nonEmptyArray.of.blueberry.optional
//         },
//         arguments
//     );
// }

// describe('addType - with argument', () => {
//     it('adds a new type: berry', () => {
//         const isBerry = (input) => String(input).indexOf('berry') !== -1;

//         addType('berry', isBerry, {
//             singular: 'a Berry',
//             plural: 'berries'
//         });

//         function addFruits() {
//             const params = {
//                 fruits: Types.array.of.berry,
//                 berry: Types.berry.optional
//             };

//             typecheck(addFruits, params, arguments);
//         }

//         expect(() => {
//             addFruits(['blueberry', 'strawberry']);
//         }).not.toThrow();

//         expect(() => {
//             addFruits(['blueberry', 'banana']);
//         }).toThrow(
//             'addFruits(fruits, berry) fruits expected an Array of berries but received an Array: ["blueberry", "banana"].'
//         );

//         expect(() => {
//             addFruits(['blueberry', 'strawberry'], true);
//         }).toThrow(
//             'addFruits(fruits, berry) berry expected a Berry or null or undefined but received a Boolean: true.'
//         );
//     });

//     it('adds a new type: blueberry', () => {
//         const isBlueberry = (input) => String(input) === 'blueberry';

//         addType('blueberry', isBlueberry, {
//             singular: 'a Blueberry',
//             plural: 'blueberries'
//         });

//         expect(Types.blueberry).toBeInstanceOf(Function);
//         expect(Types.blueberry.optional.typeName).toBe('blueberry');

//         expect(Types.array.of.blueberry.optional.typeName).toBe('blueberry');
//     });

//     it('uses type blueberry to check for a Blueberry sucessfully', () => {
//         expect(() => {
//             checkForBlueberry('blueberry');
//         }).not.toThrow();
//     });

//     it.skip('uses type blueberry to check for a nullable Blueberry sucessfully', () => {
//         expect(() => {
//             checkForNullableBlueberry(null);
//         }).not.toThrow();
//     });

//     it('uses type blueberry to check for an optional Blueberry sucessfully', () => {
//         expect(() => {
//             checkForOptionalBlueberry();
//         }).not.toThrow();
//     });

//     it('uses type blueberry to check for an array of blueberries sucessfully', () => {
//         expect(() => {
//             checkForBlueberries(['blueberry', 'blueberry']);
//         }).not.toThrow();
//     });

//     it.skip('uses type blueberry to check for nullable array of blueberries sucessfully', () => {
//         expect(() => {
//             checkForNullableBlueberries(null);
//         }).not.toThrow();
//     });

//     it('uses type blueberry to check for an optional array of blueberries sucessfully', () => {
//         expect(() => {
//             checkForOptionalBlueberries();
//         }).not.toThrow();
//     });

//     it.skip('uses type blueberry to check for an optional non-empty array of blueberries sucessfully', () => {
//         expect(() => {
//             checkForOptionalNonEmptyArrayOfBlueberries();
//         }).not.toThrow();
//     });

//     it('uses type array.of.blueberry to check for an empty list sucessfully', () => {
//         expect(() => {
//             checkForBlueberries([]);
//         }).not.toThrow();
//     });

//     it('uses type blueberry to check for a Blueberry unsucessfully', () => {
//         expect(() => {
//             checkForBlueberry(null);
//         }).toThrow('{blueberry} blueberry expected a Blueberry but received null.');
//     });

//     it('uses type array.of.blueberry to check for a blueberries unsucessfully', () => {
//         expect(() => {
//             checkForBlueberries(null);
//         }).toThrow(
//             '{blueberries} blueberries expected an Array of blueberries but received null.'
//         );
//     });

//     it('uses type array.of.blueberry to check for a list of blueberries unsucessfully', () => {
//         expect(() => {
//             checkForBlueberries(['blueberry', null]);
//         }).toThrow(
//             '{blueberries} blueberries expected an Array of blueberries but received an Array: ["blueberry", null].'
//         );
//     });

//     it.skip('uses type nonEmptyArray.of.blueberry to check for a list of blueberries unsucessfully', () => {
//         expect(() => {
//             checkForNonEmptyArrayOfBlueberries([]);
//         }).toThrow(
//             '{blueberries} blueberries expected a non-empty Array of blueberries but received an Array: [].'
//         );
//     });
// });
