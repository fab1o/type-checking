import { Types, typecheck } from '../../../src';

class Xxx {
    constructor() {
        const params = {
            code: Types.number
        };

        typecheck(this, params, arguments);
    }

    toString() {
        return 'Student';
    }
}

const errorMessage = 'Student(code) code expected a Number but received undefined.';

describe('obfuscated class', () => {
    it(errorMessage, () => {
        try {
            new Xxx();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
