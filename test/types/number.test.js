import { Types, typecheck } from '../../src';

describe('Types.number', () => {
    it('type name to be correct', () => {
        expect(Types.number.typeName).toBe('number');
    });

    it('type name of extented functions to be correct', () => {
        expect(Types.number.optional.typeName).toBe('number');
    });

    it('type name of logging functions to be correct', () => {
        expect(Types.number.warn.typeName).toBe('number');
    });

    it('does not throw an error when data is Number', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.number
                },
                [new Number()]
            );
        }).not.toThrow();
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.string
                },
                [new Number()]
            );
        }).toThrow('{year} year expected a String but received a Number: 0.');
    });

    it('does not throw an error when data is undefined', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.number.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is null', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.number.optional
                },
                [null]
            );
        }).not.toThrow();
    });
});
