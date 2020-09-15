import { typecheck } from '../../src';

describe('typecheck.if', () => {
    it('throws an error', () => {
        const errorMessage = 'This is a custom error message';

        expect(() => {
            function validator() {
                return false;
            }

            typecheck.if(validator, errorMessage);
        }).toThrow(errorMessage);
    });
});
