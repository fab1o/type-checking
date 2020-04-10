import { Types, typecheck } from '../../src';

const errorMessage = '{obj} obj expected a non-empty Object but received undefined.';

describe('Types.nonEmptyObject', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    obj: Types.nonEmptyObject
                },
                []
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
