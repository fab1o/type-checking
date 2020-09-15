import { Types, typecheck } from '../../../src';

describe('Types.x.nullable', () => {
    it('does not throw error when passing null to a nullable param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string.nullable
                },
                [null]
            );
        }).not.toThrow();
    });

    it('does throw error when passing undefined to a nullable param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string.nullable
                },
                []
            );
        }).toThrow(SyntaxError);
    });

    it('does not throw error when passing null to a types.array.of..nullable param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.array.of.string.nullable
                },
                [null]
            );
        }).not.toThrow();
    });

    it('does throw error when passing undefined to a types.array.of..nullable param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.array.of.string.nullable
                },
                []
            );
        }).toThrow(
            '{name} name expected an Array of strings or null but received undefined.'
        );
    });
});
