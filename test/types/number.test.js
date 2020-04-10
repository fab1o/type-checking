import { Types, typecheck } from '../../src';

const errorMessage = '{year} year expected a String but received a Number: 2020.';

describe('received a Number', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    year: Types.string
                },
                [2020]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
