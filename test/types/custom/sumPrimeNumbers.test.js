import { Types, typecheck } from '../../../src';

import { isPrime } from './isPrime';

function sumPrimeNumbers(prime1, prime2) {
    const params = {
        prime1: Types.custom(isPrime, 'a prime Number'),
        prime2: Types.custom(isPrime, 'a prime Number')
    };

    typecheck(sumPrimeNumbers, params, arguments);

    return prime1 + prime2;
}

describe('sumPrimeNumbers', () => {
    const errorMessage =
        'sumPrimeNumbers(prime1, prime2) prime1 expected a prime Number but received a Number: 66.';

    it(errorMessage, () => {
        try {
            sumPrimeNumbers(66, 1);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    it('79 and 3 are prime Number and their sum equals 82', () => {
        expect(sumPrimeNumbers(79, 3)).toBe(82);
    });
});
