import { Types, typecheck } from '../../../src';

const errorMessage = '{years} years expected an Array of numbers but received undefined.';

describe('Types.array.of.number', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    years: Types.array.of.number
                },
                []
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
