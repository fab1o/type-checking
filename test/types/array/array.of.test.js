import { Types, typecheck } from '../../../src';

describe('Types.array', () => {
    it.skip('an Error is not thrown when array.of.array.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.array
                },
                [[]]
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when array.of.string is optional.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.string.optional
                },
                []
            );
        }).not.toThrow();
    });

    it.skip('an Error is not thrown when array.of.string is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.string.nullable
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

    it.skip('an Error is not thrown when array.of.object() is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.object().nullable
                },
                [null]
            );
        }).not.toThrow();
    });

    it('an Error is thrown when array.of.nonEmptyArray.of.string', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.nonEmptyArray.of.string
                },
                [[[true]]]
            );
        }).toThrow(TypeError);
    });

    it('an Error is thrown when array.of.nonEmptyArray.of.array.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.nonEmptyArray.of.array
                },
                [[[]]]
            );
        }).toThrow(TypeError);
    });

    it('an Error is thrown when array.of.nonEmptyArray.of.nonEmptyArray.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.nonEmptyArray.of.nonEmptyArray
                },
                [[[1]]]
            );
        }).toThrow(TypeError);
    });

    it('an Error is thrown when array.of.array.of.array.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.array.of.array
                },
                [[[1]]]
            );
        }).toThrow(TypeError);
    });

    it('an Error is thrown when array.of.array.of.nonEmptyArray.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.array.of.nonEmptyArray
                },
                [[[1]]]
            );
        }).toThrow(TypeError);
    });
});
