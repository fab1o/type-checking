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
    it('throw an error for constructor', () => {
        expect(() => {
            new Student(false);
        }).toThrow('Student() this is a custom error message.');
    });

    it('throw an error for method', () => {
        expect(() => {
            const student = new Student(true);

            student.method();
        }).toThrow('Student.method() this is a custom error message.');
    });
});
