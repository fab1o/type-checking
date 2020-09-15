import { Types, typecheck } from '../../../src';

import { isPrime } from './isPrime';

function sumPrimeNumbers() {
    const params = {
        prime1: Types.custom(isPrime)
    };

    typecheck(sumPrimeNumbers, params, arguments);

    return true;
}

describe('Types.custom', () => {
    it('throw an error', () => {
        expect(() => {
            sumPrimeNumbers(66);
        }).toThrow(
            'sumPrimeNumbers(prime1) prime1 expected custom but received a Number: 66.'
        );
    });
});
