import { Types, typecheck } from '../../src';

describe('Types.inRange', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.inRange(1, 3)
                },
                [0]
            );
        }).toThrow(
            '{code} code expected a Number in the range 1 to 3 but received a Number: 0.'
        );
    });

    it('not throw an error', () => {
        expect(() => {
            typecheck(
                {
                    code: Types.inRange(1, 3)
                },
                [1]
            );
        }).not.toThrow();
    });
});
