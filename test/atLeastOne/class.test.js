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
    it('no argument is provided', () => {
        expect(() => {
            const student = new Student();

            student.methodWithArgs();
        }).toThrow(
            'Student.methodWithArgs(name, year) at least one parameter must be provided.'
        );
    });
});
