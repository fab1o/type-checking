import { Types, typecheck } from '../../../src';

import { isPrime } from './isPrime';

function sumPrimeNumbers(array) {
    const params = {
        array: Types.array.of.custom(isPrime, 'prime Numbers')
    };

    typecheck(sumPrimeNumbers, params, arguments);

    return array.reduce((p, c) => {
        return p + c;
    });
}

describe('sumPrimeNumbers', () => {
    const errorMessage =
        'sumPrimeNumbers(array) array expected an Array of prime Numbers but received an Array: [].';

    it(errorMessage, () => {
        try {
            sumPrimeNumbers([]);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    it('null is not an array of prime numbers', () => {
        expect(() => sumPrimeNumbers(null)).toThrow(SyntaxError);
    });

    it('1 is not a prime number', () => {
        expect(() => sumPrimeNumbers([79, 3, 5, 2, 1])).toThrow(SyntaxError);
    });

    it('sum of prime Numbers equals 89', () => {
        expect(sumPrimeNumbers([79, 3, 5, 2])).toBe(89);
    });
});
