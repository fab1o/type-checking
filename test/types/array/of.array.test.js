import { Types, typecheck } from '../../../src';

const errorMessage = '{years} years expected an Array of arrays but received undefined.';

describe('Types.array.of.array', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    years: Types.array.of.array
                },
                []
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
