import { Types, typecheck } from '../../src';

function createStudentWithOptions(options) {
    const params = {
        options: Types.object({
            name: Types.string,
            year: Types.number
        })
    };

    typecheck(createStudentWithOptions, params, { options });
}

describe('function using object as argument for input', () => {
    const errorMessage =
        'createStudentWithOptions({ options }) options expected an Object with properties but received undefined.';

    it(errorMessage, () => {
        try {
            createStudentWithOptions();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 =
        'createStudentWithOptions({ options }) options expected an Object with properties but received null.';

    it(errorMessage2, () => {
        try {
            createStudentWithOptions(null);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });

    it('an Error is not thrown when passing valid data.', () => {
        expect(() => {
            createStudentWithOptions({
                name: '',
                year: 2020
            });
        }).not.toThrow();
    });
});
