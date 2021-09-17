import { Types, typecheck } from '../../src';

describe.skip('Types.arrayLike', () => {
    it('type name to be correct', () => {
        expect(Types.arrayLike.typeName).toBe('arrayLike');
    });

    it('type name of extented functions to be correct', () => {
        expect(Types.arrayLike.optional.typeName).toBe('arrayLike');
    });

    it('type name of logging functions to be correct', () => {
        expect(Types.arrayLike.warn.typeName).toBe('arrayLike');
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.arrayLike
                },
                [false]
            );
        }).toThrow('{year} year expected an Array-like but received a Boolean: false.');
    });

    it('does not throw an error when data is array', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.arrayLike
                },
                [[]]
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is Uint16Array', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.arrayLike
                },
                [new Uint16Array(8)]
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is string', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.arrayLike
                },
                ['']
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is undefined', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.arrayLike.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is null', () => {
        expect(() => {
            typecheck(
                {
                    year: Types.arrayLike.optional
                },
                [null]
            );
        }).not.toThrow();
    });
});
