import { Types, typecheck } from '../../src';

describe('param multiple', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string,
                    age: Types.number
                },
                ['Fabio']
            );
        }).toThrow('{name, age} age expected a Number but received undefined.');
    });
});
