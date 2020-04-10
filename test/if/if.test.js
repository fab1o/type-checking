import { typecheck } from '../../src';

describe('typecheck.if', () => {
    it('throws an error', () => {
        function validator() {
            return false;
        }

        const errorMessage = 'This is a custom error message';

        try {
            typecheck.if(validator, errorMessage);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(`${errorMessage}.`);
        }
    });
});
