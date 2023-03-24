// ***
// import { Types, typecheck, extendParams } from '../src';

// describe('extendParams', () => {
//     const Person = {
//         name: Types.string
//     };

//     const Student = extendParams(Person, {
//         year: Types.number
//     });

//     it('error is thrown on bad data', () => {
//         expect(() => {
//             const params = extendParams(
//                 {
//                     name: Types.string
//                 },
//                 {
//                     score: Types.number
//                 }
//             );

//             typecheck(params, {});
//         }).toThrow('{name, score} name expected a String but received undefined.');
//     });

//     it('no error on multiple params', () => {
//         expect(() => {
//             const InterStudent = extendParams(Student, Person, {
//                 country: Types.string
//             });

//             const InterstellarStudent = extendParams(Student, Person, InterStudent, {
//                 planet: Types.string
//             });

//             typecheck(
//                 'method',
//                 {
//                     student: Types.object(InterstellarStudent)
//                 },
//                 [
//                     {
//                         planet: 'Earth'
//                     }
//                 ]
//             );
//         }).toThrow(
//             'method({ name, year, country, planet }) student.name expected a String but received undefined.'
//         );
//     });

//     it('error is thrown for name', () => {
//         expect(() => {
//             typecheck(
//                 {
//                     student: Types.object(Student)
//                 },
//                 [
//                     {
//                         name: null,
//                         year: 2021
//                     }
//                 ]
//             );
//         }).toThrow('{{ name, year }} student.name expected a String but received null.');
//     });

//     it('error is thrown for year', () => {
//         expect(() => {
//             typecheck(
//                 {
//                     student: Types.object(Student)
//                 },
//                 [
//                     {
//                         name: 'Fabio',
//                         year: null
//                     }
//                 ]
//             );
//         }).toThrow('{{ name, year }} student.year expected a Number but received null.');
//     });

//     it('error is thrown on bad setup', () => {
//         expect(() => {
//             extendParams(null);
//         }).toThrow('extendParams(...params) params expected an Object built with Types.');
//     });

//     it('error is thrown on bad another setup', () => {
//         expect(() => {
//             extendParams(Student, {
//                 obj: Types.object
//             });
//         }).toThrow('extendParams(...params) params expected an Object built with Types.');
//     });

//     it('no error is thrown', () => {
//         expect(() => {
//             typecheck(
//                 {
//                     student: Types.object(Student)
//                 },
//                 [
//                     {
//                         name: 'Fabio',
//                         year: 2021
//                     }
//                 ]
//             );
//         }).not.toThrow();
//     });
// });
