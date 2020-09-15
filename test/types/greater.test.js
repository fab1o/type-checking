import { Types, typecheck } from '../../src';

describe('Types.greater', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.greater(1)
                },
                [1]
            );
        }).toThrow(
            '{code} code expected a Number greater than 1 but received a Number: 1.'
        );
    });

    it('an Error is not thrown.', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.greater(6)
                },
                [7]
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when between is optional.', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.greater(1).optional
                },
                []
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when between is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.greater(1).nullable
                },
                [null]
            );
        }).not.toThrow();
    });
});
