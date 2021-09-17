import { Types, typecheck } from '../../src';

describe.skip('Types.equal', () => {
    it('type name to be correct', () => {
        expect(Types.equal().typeName).toBe('equal');
    });

    it('type name of extented functions to be correct', () => {
        expect(Types.equal().optional.typeName).toBe('equal');
    });

    it('type name of logging functions to be correct', () => {
        expect(Types.equal().warn.typeName).toBe('equal');
    });

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
