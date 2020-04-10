import { Types, typecheck } from '../../src';

class Student {
    constructor(options) {
        const params = {
            options: Types.object({
                name: Types.string
            })
        };

        typecheck(this, params, arguments);
    }
}

const errorMessage =
    'Student(options) options expected an Object with properties but received undefined.';

describe('class with options', () => {
    it(errorMessage, () => {
        try {
            new Student();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
