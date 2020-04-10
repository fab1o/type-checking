import { Types, typecheck } from '../../src';

import Parent from './relationship/constructor/parent';

const errorMessage = '{ok} ok expected a Boolean but received Parent.';

describe('received type for a class constructor', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    ok: Types.boolean
                },
                [Parent]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
