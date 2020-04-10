import { Types, typecheck } from '../../../src';

describe('object with properties', () => {
    const errorMessage =
        '{options} options expected an Object with properties but received an Object: {}.';

    it(errorMessage, () => {
        try {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string
                    })
                },
                [{}]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 = '{{ name }} options.name expected a String but received undefined.';

    it(errorMessage2, () => {
        try {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string
                    })
                },
                [{ name: undefined }]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });
});
