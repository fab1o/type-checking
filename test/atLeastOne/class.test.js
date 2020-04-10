import { typecheck, Types } from '../../src';

class Student {
    methodWithArgs(name, year) {
        const params = {
            name: Types.string.optional,
            year: Types.number.optional
        };

        typecheck.atLeastOne(this, this.methodWithArgs, params, arguments);
    }
}

describe('typecheck.atLeastOne in a class', () => {
    const errorMessage =
        'Student.methodWithArgs(name, year) at least one parameter must be provided.';

    it(errorMessage, () => {
        try {
            const student = new Student({
                name: 'Fabio'
            });

            student.methodWithArgs();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
