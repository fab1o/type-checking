import { Types, typecheck } from '../../../src';

class Xxx {
    constructor() {
        const params = {
            name: Types.string
        };

        typecheck('Student', params, arguments);
    }
}

const errorMessage = 'Student(name) name expected a String but received undefined.';

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
