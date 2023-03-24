import { Types, typecheck } from '../../src';

describe('Types.string', () => {
    it('type name to be correct', () => {
        expect(Types.string.typeName).toBe('string');
    });

    it('type name of extented functions to be correct', () => {
        expect(Types.string.optional.typeName).toBe('string');
    });

    it('type name of logging functions to be correct', () => {
        expect(Types.string.warn.typeName).toBe('string');
    });

    it('does not throw an error when data is String', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.string
                },
                [new String()]
            );
        }).not.toThrow();
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.boolean
                },
                [new String()]
            );
        }).toThrow('{year} year expected a Boolean but received a String: "".');
    });

    it('does not throw an error when data is undefined', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.string.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is null', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.string.optional
                },
                [null]
            );
        }).not.toThrow();
    });
});
