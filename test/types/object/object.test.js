import { Types, typecheck } from '../../../src';

const errorMessage = '{obj} obj expected an Object but received undefined.';

describe('Types.object()', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    obj: Types.object()
                },
                []
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
