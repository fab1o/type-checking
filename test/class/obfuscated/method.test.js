import { Types, typecheck } from '../../../src';

class Xxx {
    yyy() {
        const params = {
            code: Types.array.of.number
        };

        typecheck(this, 'method', params, arguments);
    }

    toString() {
        return 'Student';
    }
}

const errorMessage =
    'Student.method(code) code expected an Array of numbers but received undefined.';

describe('obfuscated method', () => {
    it(errorMessage, () => {
        try {
            const x = new Xxx();

            x.yyy();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
