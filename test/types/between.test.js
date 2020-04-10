import { Types, typecheck } from '../../src';

const errorMessage = '{code} code expected a Number between 6 and 9 but received a Number: 1.';

describe('Types.between', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    code: Types.between(6, 9)
                },
                [1]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
