import { Types, typecheck } from '../../src';

const errorMessage = '{name, { name }} friend.name expected a Number but received null.';

describe('parent param name versus child param name', () => {
    it(errorMessage, () => {
        try {
            typecheck(
                {
                    name: Types.string,
                    friend: Types.object({
                        name: Types.number
                    })
                },
                ['Fabio', { name: null }]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 = '{{ name }, name} name expected a String but received null.';

    it(errorMessage2, () => {
        try {
            typecheck(
                {
                    friend: Types.object({
                        name: Types.number
                    }),
                    name: Types.string
                },
                [{ name: 1 }, null]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });
});
