import { Types, typecheck } from '../../src';

const errorMessage = '{name, age} age expected a Number but received undefined.';

describe('param multiple', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    name: Types.string,
                    age: Types.number
                },
                ['Fabio']
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });
});
