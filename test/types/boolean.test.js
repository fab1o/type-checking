import { Types, typecheck } from '../../src';

const errorMessage = '{year} year expected a String but received a Boolean: false.';

describe('received a Boolean', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    year: Types.string
                },
                [false]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
