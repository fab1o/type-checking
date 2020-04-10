import { Types, typecheck } from '../../src';

describe('Types.nullable', () => {
    it('an Error is thrown when passing undefined to a nullable param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.nullable.string
                },
                []
            );
        }).toThrow(SyntaxError);
    });

    it('an Error is not thrown when passing null to a nullable param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.nullable.string
                },
                [null]
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when passing null to a nullable and optional param.', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.nullable.string.optional
                },
                [null]
            );
        }).not.toThrow();
    });
});
