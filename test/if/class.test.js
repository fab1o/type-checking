import { typecheck } from '../../src';

class Student {
    constructor(bool) {
        const errorMessage = 'this is a custom error message';

        function validator() {
            return bool;
        }

        typecheck.if(this, validator, errorMessage);
    }

    method() {
        const errorMessage = 'this is a custom error message';

        function validator() {
            return false;
        }

        typecheck.if(this, this.method, validator, errorMessage);
    }
}

describe('typecheck.if in a class', () => {
    const errorMessage = 'Student() this is a custom error message.';

    it(errorMessage, () => {
        try {
            new Student(false);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMethodMessage = 'Student.method() this is a custom error message.';

    it(errorMethodMessage, () => {
        try {
            const student = new Student(true);

            student.method();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMethodMessage);
        }
    });
});
