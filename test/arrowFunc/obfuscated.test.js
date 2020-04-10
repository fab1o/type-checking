import { Types, typecheck } from '../../src';

const xxx = (...args) => {
    const params = {
        isOk: Types.boolean
    };

    typecheck('createStudent', params, args);
};

const errorMessage = 'createStudent(isOk) isOk expected a Boolean but received undefined.';

describe('obfuscated function', () => {
    it(errorMessage, () => {
        try {
            xxx();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
