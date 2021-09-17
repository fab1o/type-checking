// ***
// import { Types, validateParams } from '../src';

// describe('validateParams', () => {
//     it('expects to be false', () => {
//         expect(validateParams(null)).toBe(false);
//     });

//     it('expects to be false when one of the params is invalid', () => {
//         expect(
//             validateParams({
//                 param1: Types.string,
//                 param2: null
//             })
//         ).toBe(false);
//     });

//     it('expects to be false when type does not exist', () => {
//         expect(
//             validateParams({
//                 obj: Types.object
//             })
//         ).toBe(false);
//     });

//     it('expects to be true for valid types', () => {
//         expect(
//             validateParams({
//                 num: Types.number,
//                 obj: Types.object()
//             })
//         ).toBe(true);
//     });
// });
