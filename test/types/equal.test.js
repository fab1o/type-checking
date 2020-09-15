import { Types, typecheck } from '../../src';

describe('Types.equal', () => {
    it('throw error', () => {
        expect(() => {
            typecheck(
                {
                    a: Types.equal(3)
                },
                [1]
            );
        }).toThrow('{a} a expected 3 but received a Number: 1.');
    });

    it('does not throw an error on a skip type', () => {
        expect(() => {
            typecheck(
                {
                    a: Types.equal(3)
                },
                [3]
            );
        }).not.toThrow();
    });

    it('throw error when null', () => {
        expect(() => {
            typecheck(
                {
                    a: Types.equal(null)
                },
                [true]
            );
        }).toThrow('{a} a expected null but received a Boolean: true.');
    });
});
