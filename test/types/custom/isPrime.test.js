import { Check, Types, typecheck } from '../../../src';

import {
    isPrime,
    isPrimeAndBetween,
    isPrimeAndBetweenViaInput,
    isPrimeAndBetweenViaOptionsInput
} from './isPrime';

describe('Types.custom() using args and userArguments', () => {
    it('does throw error for a Prime number', () => {
        expect(() => {
            typecheck(
                {
                    x: Types.custom(isPrime, 'a Prime Number')
                },
                [6]
            );
        }).toThrow('{x} x expected a Prime Number but received a Number: 6.');
    });

    it('does not throw error for a Prime number', () => {
        expect(() => {
            typecheck(
                {
                    x: Types.custom(isPrime, 'a Prime Number')
                },
                [3]
            );
        }).not.toThrow();
    });

    it('does throw error for a Prime number between 1 and 6', () => {
        expect(() => {
            typecheck(
                {
                    x: Types.custom(
                        isPrimeAndBetween,
                        'a Prime Number and between 1 and 6',
                        1,
                        6
                    )
                },
                [7]
            );
        }).toThrow(
            '{x} x expected a Prime Number and between 1 and 6 but received a Number: 7.'
        );
    });

    it('does not throw error for a Prime number between 1 and 6', () => {
        expect(() => {
            typecheck(
                {
                    x: Types.custom(
                        isPrimeAndBetween,
                        'a Prime Number and between 1 and 6',
                        1,
                        6
                    )
                },
                [3]
            );
        }).not.toThrow();
    });

    it('does throw error for a Prime number between numbers via userArguments', () => {
        expect(() => {
            typecheck(
                {
                    x: Types.custom(
                        isPrimeAndBetweenViaInput,
                        'a prime Number between min and max'
                    ),
                    min: Types.number,
                    max: Types.number
                },
                [7, 1, 6]
            );
        }).toThrow(
            '{x, min, max} x expected a prime Number between min and max but received a Number: 7.'
        );
    });

    it('does not throw error for a Prime number between numbers via userArguments', () => {
        expect(() => {
            typecheck(
                {
                    x: Types.custom(
                        isPrimeAndBetweenViaInput,
                        'a prime Number between min and max'
                    ),
                    min: Types.number,
                    max: Types.number
                },
                [7, 1, 8]
            );
        }).not.toThrow();
    });

    it('does throw error for a Prime number between numbers via options userArguments', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        x: Types.custom(
                            isPrimeAndBetweenViaOptionsInput,
                            'a prime Number between min and max'
                        ),
                        min: Types.number,
                        max: Types.number
                    })
                },
                [
                    {
                        x: 7,
                        min: 1,
                        max: 6
                    }
                ]
            );
        }).toThrow(
            '{{x, min, max}} options.x expected a prime Number between min and max but received a Number: 7.'
        );
    });

    it('does not throw error for a Prime number between numbers via options userArguments', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        x: Types.custom(
                            isPrimeAndBetweenViaOptionsInput,
                            'a prime Number between min and max'
                        ),
                        min: Types.number,
                        max: Types.number
                    })
                },
                [
                    {
                        x: 7,
                        min: 1,
                        max: 8
                    }
                ]
            );
        }).not.toThrow();
    });
});
