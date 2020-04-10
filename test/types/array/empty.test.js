import { Types, typecheck } from '../../../src';

describe('Types.array.of.object()', () => {
    it('expect not to throw an error when passing an empty array.', () => {
        expect(() => {
            typecheck(
                {
                    objs: Types.array.of.object()
                },
                [[]]
            );
        }).not.toThrow();
    });
});
