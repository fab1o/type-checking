import { Types, typecheck } from '../../src';

function createStudent(...args) {
    const params = {
        name: Types.string
    };

    typecheck(createStudent, params, args);
}

const errorMessage = 'createStudent(name) name expected a String but received undefined.';

describe('function using rest parameter as argument for input', () => {
    it(errorMessage, () => {
        try {
            createStudent();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    it('an Error is not thrown when passing correct data.', () => {
        expect(() => {
            createStudent('Fabio');
        }).not.toThrow();
    });
});
