import { Types, typecheck } from '../../../src';

describe('Types.x.undefinable', () => {
    it('does throw error when passing null to a undefinable param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string.undefinable
                },
                [null]
            );
        }).toThrow(SyntaxError);
    });

    it('does not throw error when passing undefined to a undefinable param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string.undefinable
                },
                []
            );
        }).not.toThrow();
    });

    it('does throw error when passing null to a types.array.of..undefinable param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.array.of.string.undefinable
                },
                [null]
            );
        }).toThrow(
            '{name} name expected an Array of strings or undefined but received null.'
        );
    });

    it('does not throw error when passing undefined to a types.array.of..undefinable param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.array.of.string.undefinable
                },
                []
            );
        }).not.toThrow();
    });
});
