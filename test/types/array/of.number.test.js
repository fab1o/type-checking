import { Types, typecheck } from '../../../src';

describe('Types.array.of.number', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    years: Types.array.of.number
                },
                []
            );
        }).toThrow('{years} years expected an Array of numbers but received undefined.');
    });
});
