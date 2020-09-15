import { Types, typecheck } from '../../../src';

describe('Types.array.of.array', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    years: Types.array.of.array
                },
                []
            );
        }).toThrow('{years} years expected an Array of arrays but received undefined.');
    });
});
