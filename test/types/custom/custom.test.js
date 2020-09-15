import { Types, typecheck } from '../../../src';

describe('Types.custom()', () => {
    it('an Error is not thrown when custom is optional.', () => {
        expect(() => {
            typecheck(
                {
                    c: Types.custom().optional
                },
                []
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when custom is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    c: Types.custom().nullable
                },
                [null]
            );
        }).not.toThrow();
    });

    it('an Error when using Types.custom.', () => {
        expect(() => {
            typecheck(
                {
                    c: Types.custom
                },
                [null]
            );
        }).toThrow('typecheck(...) params expected an Object built with Types.');
    });
});
