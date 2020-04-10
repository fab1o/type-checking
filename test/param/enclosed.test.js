import { Types, typecheck } from '../../src';

function objectEnclosedByArray() {
    const params = {
        objs: Types.array.of.object({
            name: Types.string
        }).optional
    };

    typecheck(objectEnclosedByArray, params, arguments);
}

describe('param enclosed', () => {
    const errorMessage =
        'objectEnclosedByArray(objs) [objs] expected an Array of objects with properties but received an Array: [{}].';

    it(errorMessage, () => {
        try {
            objectEnclosedByArray([{}]);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 =
        'objectEnclosedByArray([{ name }]) objs.name expected a String but received null.';

    it(errorMessage2, () => {
        try {
            objectEnclosedByArray([
                {
                    name: null
                }
            ]);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });
});
