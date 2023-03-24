import { Types, typecheck } from '../../src';

describe.skip('Types.between', () => {
    it('type name to be correct', () => {
        expect(Types.between().typeName).toBe('between');
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.between(1, 3)
                },
                [1]
            );
        }).toThrow('{code} code expected a Number between 1 and 3 but received a Number: 1.');
    });

    it('an Error is not thrown.', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.between(1, 3)
                },
                [2]
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when between is optional.', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.between(1, 3).optional
                },
                []
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when between is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.between(1, 3).nullable
                },
                [null]
            );
        }).not.toThrow();
    });

    it('an Error is not thrown for array of between.', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.array.of.between(1, 3)
                },
                [[1, 6]]
            );
        }).toThrow(
            '{code} code expected an Array of numbers between 1 and 3 but received an Array: [1, 6].'
        );
    });
});
