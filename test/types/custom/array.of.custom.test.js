import { Types, typecheck } from '../../../src';

import { isPrime } from './isPrime';

describe.skip('Types.array.of.custom', () => {
    function sumPrimeNumbers(array) {
        const params = {
            array: Types.array.of.custom(isPrime, 'a list of prime Numbers')
        };

        typecheck(sumPrimeNumbers, params, arguments);

        if (array.length > 0) {
            return array.reduce((p, c) => {
                return p + c;
            });
        }

        return 0;
    }

    it('throw no error', () => {
        expect(() => {
            sumPrimeNumbers([]);
        }).not.toThrow();
    });

    it('null is not an array of prime numbers', () => {
        expect(() => sumPrimeNumbers(null)).toThrow(TypeError);
    });

    it('1 is not a prime number', () => {
        expect(() => sumPrimeNumbers([79, 3, 5, 2, 1])).toThrow(TypeError);
    });

    it('sum of prime Numbers equals 89', () => {
        expect(sumPrimeNumbers([79, 3, 5, 2])).toBe(89);
    });
});
