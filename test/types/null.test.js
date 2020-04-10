import { Types, typecheck } from '../../src';

describe('null', () => {
    it('an Error is thrown when passing null to a required param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string
                },
                [null]
            );
        }).toThrow(SyntaxError);
    });
});
