import { Types, typecheck } from '../../src';

import Parent from './relationship/constructor/parent';

describe('Received type for a class constructor', () => {
    it('wrong argument is provided', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean
                },
                [Parent]
            );
        }).toThrow('{ok} ok expected a Boolean but received Parent.');
    });
});
