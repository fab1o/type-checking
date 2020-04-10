import { Types, typecheck } from '../../src';

function createStudentWithoutOptions(options) {
    const params = {
        name: Types.string,
        year: Types.number
    };

    typecheck(createStudentWithoutOptions, params, options);
}

describe('function using object as argument for input', () => {
    const errorMessage =
        'typecheck(...) arguments expected an Array or an Object. Make sure you configure params and invoke typecheck correctly.';

    it(errorMessage, () => {
        try {
            createStudentWithoutOptions();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 =
        'typecheck(...) arguments expected an Array or an Object. Make sure you configure params and invoke typecheck correctly.';

    it(errorMessage2, () => {
        try {
            createStudentWithoutOptions(null);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
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
