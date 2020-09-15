import { Types, typecheck } from '../../src';

describe('Types.between', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.between(1, 3)
                },
                [1]
            );
        }).toThrow(
            '{code} code expected a Number between 1 and 3 but received a Number: 1.'
        );
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
});
