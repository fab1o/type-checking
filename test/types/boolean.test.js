import { Types, typecheck } from '../../src';

describe('Types.boolean', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.string
                },
                [false]
            );
        }).toThrow('{year} year expected a String but received a Boolean: false.');
    });
});
