import { Types, typecheck } from '../../../src';

describe('object as options', () => {
    const errorMessage =
        '{options} options expected an Object with properties but received undefined.';

    it(errorMessage, () => {
        try {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string
                    })
                },
                []
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessageNull =
        '{options} options expected an Object with properties but received null.';

    it(errorMessageNull, () => {
        try {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string
                    })
                },
                [null]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessageNull);
        }
    });

    const errorMessageEmptyObj = '{{ name }} options.name expected a String but received null.';

    it(errorMessageEmptyObj, () => {
        try {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string
                    })
                },
                [{ name: null }]
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessageEmptyObj);
        }
    });

    it('should not fail', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string
                    }).optional
                },
                []
            );
        }).not.toThrow();
    });
});
