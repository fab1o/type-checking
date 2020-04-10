import { Types, typecheck } from '../../src';

const createStudent = (...args) => {
    const params = {
        name: Types.string
    };

    typecheck(createStudent, params, args);
};

const errorMessage = 'createStudent(name) name expected a String but received undefined.';

describe('arrow function', () => {
    it(errorMessage, () => {
        try {
            createStudent();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
