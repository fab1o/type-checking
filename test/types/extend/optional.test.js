import { Types, typecheck } from '../../../src';

describe('Types.x.optional', () => {
    it('does not throw error when passing null to a optional param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string.optional
                },
                [null]
            );
        }).not.toThrow();
    });

    it('does not throw error when passing undefined to a optional param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('does not throw error when passing null to a types.array.of..optional param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.array.of.string.optional
                },
                [null]
            );
        }).not.toThrow();
    });

    it('does not throw error when passing undefined to a types.array.of..optional param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.array.of.string.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('throw error when passing invalid data to a types.array.of..optional param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.array.of.string.optional
                },
                [['', 1, '', '']]
            );
        }).toThrow(
            '{name} name expected an Array of strings or null or undefined but received an Array: ["", 1, ...].'
        );
    });
});
