import { Types, typecheck } from '../../src';

const errorMessage = '{code} code expected a Number in the range 6 to 9 but received a Number: 1.';

describe('Types.inRange', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    code: Types.inRange(6, 9)
                },
                [1]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
