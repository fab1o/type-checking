import { Types, typecheck } from '../../src';

const errorMessage = '{year} year expected a Number but received a String: "Fabio".';

describe('received a String', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    year: Types.number
                },
                ['Fabio']
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
