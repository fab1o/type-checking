import { Types, typecheck } from '../../src';

describe('Types.x.optional', () => {
    it('an Error is not thrown when passing undefined to an optional param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('an Error is thrown when passing null to an optional param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string.optional
                },
                [null]
            );
        }).toThrow(SyntaxError);
    });
});
