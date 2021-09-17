// import { Types, typecheck, addType } from '../../src';

// class Account {}

// function checkForAccount() {
//     typecheck(
//         {
//             account: Types.any(Account)
//         },
//         arguments
//     );
// }

// function checkForaccount() {
//     const account = new Account();

//     typecheck(
//         {
//             account: Types.any(account)
//         },
//         arguments
//     );
// }

// function checkForDate() {
//     typecheck(
//         {
//             date: Types.any(Date)
//         },
//         arguments
//     );
// }

// function checkForNull() {
//     typecheck(
//         {
//             null: Types.any(null)
//         },
//         arguments
//     );
// }

// function checkForString() {
//     typecheck(
//         {
//             string: Types.any('TypeChecking')
//         },
//         arguments
//     );
// }

// function checkForNumber() {
//     typecheck(
//         {
//             number: Types.any(13)
//         },
//         arguments
//     );
// }

// function checkForFunction() {
//     typecheck(
//         {
//             func: Types.any(() => {})
//         },
//         arguments
//     );
// }

// function checkForobject() {
//     typecheck(
//         {
//             obj: Types.any({})
//         },
//         arguments
//     );
// }

// function checkForObject() {
//     typecheck(
//         {
//             obj: Types.any(Object)
//         },
//         arguments
//     );
// }

// function checkForarray() {
//     typecheck(
//         {
//             array: Types.any([])
//         },
//         arguments
//     );
// }

// function checkForArray() {
//     typecheck(
//         {
//             array: Types.any(Array)
//         },
//         arguments
//     );
// }

// describe('addType - any', () => {
//     const isAny = (value, input, ...args) => !!args.find((arg) => arg === value);

//     addType('any', isAny, {
//         singular: '{a}',
//         expectArgs: true
//     });

//     it('uses type any to check for Account', () => {
//         expect(() => {
//             checkForAccount(null);
//         }).toThrow('{account} account expected Account but received null.');
//     });

//     it('uses type any to check for account', () => {
//         expect(() => {
//             checkForaccount(null);
//         }).toThrow('{account} account expected Account but received null.');
//     });

//     it('uses type any to check for null', () => {
//         expect(() => {
//             checkForNull();
//         }).toThrow('{null} null expected null but received undefined.');
//     });

//     it('uses type any to check for Date', () => {
//         expect(() => {
//             checkForDate(null);
//         }).toThrow('{date} date expected Date but received null.');
//     });

//     it('uses type any to check for String', () => {
//         expect(() => {
//             checkForString(null);
//         }).toThrow('{string} string expected "TypeChecking" but received null.');
//     });

//     it('uses type any to check for Number', () => {
//         expect(() => {
//             checkForNumber(null);
//         }).toThrow('{number} number expected 13 but received null.');
//     });

//     it('uses type any to check for Function', () => {
//         expect(() => {
//             checkForFunction(null);
//         }).toThrow('{func} func expected Function but received null.');
//     });

//     it('uses type any to check for object', () => {
//         expect(() => {
//             checkForobject(null);
//         }).toThrow('{obj} obj expected {} but received null.');
//     });

//     it('uses type any to check for Object', () => {
//         expect(() => {
//             checkForObject(null);
//         }).toThrow('{obj} obj expected Object but received null.');
//     });

//     it('uses type any to check for Array', () => {
//         expect(() => {
//             checkForArray(null);
//         }).toThrow('{array} array expected Array but received null.');
//     });

//     it('uses type any to check for array', () => {
//         expect(() => {
//             checkForarray(null);
//         }).toThrow('{array} array expected [] but received null.');
//     });
// });
