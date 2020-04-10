import { Types, typecheck } from '../../../src';

import { isPrime } from './isPrime';

function sumPrimeNumbers(prime1) {
    const params = {
        prime1: Types.custom(isPrime, '')
    };

    typecheck(sumPrimeNumbers, params, arguments);

    return true;
}

describe('Types.custom', () => {
    const errorMessage = 'sumPrimeNumbers(prime1) prime1 expected  but received a Number: 66.';

    it(errorMessage, () => {
        try {
            sumPrimeNumbers(66);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
