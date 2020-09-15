import { Types, typecheck } from '../../../src';

describe('Types.array', () => {
    it('an Error is not thrown when array.of.boolean is optional.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.boolean.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when array.of.boolean is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.boolean.nullable
                },
                [null]
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when array.of.object() is optional.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.object().optional
                },
                []
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when array.of.object() is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.object().nullable
                },
                [null]
            );
        }).not.toThrow();
    });
});
