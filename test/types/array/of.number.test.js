import { Types, typecheck } from '../../../src';

describe('Types.array.of.number', () => {
    it('not to throw an error', () => {
        expect(() => {
            typecheck(
                {
                    years: Types.array.of.number
                },
                [[1, 2, 3, 4, 5]]
            );
        }).not.toThrow();
    });

    it('throw an error for undefined', () => {
        expect(() => {
            typecheck(
                {
                    years: Types.array.of.number
                },
                []
            );
        }).toThrow('{years} years expected an Array of numbers but received undefined.');
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    years: Types.array.of.string
                },
                [[1, 2, 3, 4, 5]]
            );
        }).toThrow(
            '{years} years expected an Array of strings but received an Array: [1, 2, ...].'
        );
    });
});
