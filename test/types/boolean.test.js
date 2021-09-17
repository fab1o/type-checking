import { Types, typecheck } from '../../src';

describe('Types.boolean', () => {
    it('type name to be correct', () => {
        expect(Types.boolean.typeName).toBe('boolean');
    });

    it('type name of extented functions to be correct', () => {
        expect(Types.boolean.optional.typeName).toBe('boolean');
    });

    it('type name of logging functions to be correct', () => {
        expect(Types.boolean.warn.typeName).toBe('boolean');
    });

    it('does not throw an error when data is Boolean', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.boolean
                },
                [new Boolean()]
            );
        }).not.toThrow();
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.string
                },
                [new Boolean()]
            );
        }).toThrow('{year} year expected a String but received a Boolean: false.');
    });

    it('does not throw an error when data is undefined', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.boolean.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is null', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.boolean.optional
                },
                [null]
            );
        }).not.toThrow();
    });
});
