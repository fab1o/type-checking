import { Types, typecheck } from '../../src';

describe.skip('Types.type.and.type', () => {
    it('throws no error when value is an integer and positive', () => {
        expect(() => {
            typecheck(
                {
                    n: Types.integer.and.positive
                },
                [1]
            );
        }).not.toThrow();
    });

    it('throws error when value is not an integer and positive', () => {
        expect(() => {
            typecheck(
                {
                    n: Types.integer.and.positive
                },
                [1.5]
            );
        }).toThrow(
            '{n} n expected an integer and a Number greater than 0 but received a Number: 1.5.'
        );
    });

    it('throws no error when value is undefined', () => {
        expect(() => {
            typecheck(
                {
                    n: Types.integer.and.positive.optional
                },
                []
            );
        }).not.toThrow();
    });
});
