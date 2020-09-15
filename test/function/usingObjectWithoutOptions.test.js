import { Types, typecheck } from '../../src';

function createStudentWithoutOptions(options) {
    const params = {
        name: Types.string,
        year: Types.number
    };

    typecheck(createStudentWithoutOptions, params, options);
}

describe('function using object as argument for input', () => {
    it('throw an error', () => {
        expect(() => {
            createStudentWithoutOptions();
        }).toThrow(
            'typecheck(...) arguments expected an Array or an Object. Make sure you invoke typecheck correctly.'
        );
    });

    it('throw an error with null', () => {
        expect(() => {
            createStudentWithoutOptions(null);
        }).toThrow(
            'typecheck(...) arguments expected an Array or an Object. Make sure you invoke typecheck correctly.'
        );
    });

    it('an Error is not thrown when passing valid data.', () => {
        expect(() => {
            createStudentWithoutOptions({
                name: '',
                year: 2020
            });
        }).not.toThrow();
    });
});
