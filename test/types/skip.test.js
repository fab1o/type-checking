import { Types, typecheck } from '../../src';

describe('Types.skip', () => {
    it('throw error displaying the parameter in the error message with a skip type', () => {
        expect(() => {
            typecheck(
                'function',
                {
                    b: Types.string,
                    c: Types.skip
                },
                [1]
            );
        }).toThrow('function(b, c) b expected a String but received a Number: 1.');
    });

    it('does not throw an error on a skip type', () => {
        expect(() => {
            typecheck(
                'function',
                {
                    b: Types.number,
                    c: Types.skip
                },
                [1]
            );
        }).not.toThrow();
    });
});
