import { Config, Types, typecheck } from '../../src';

function optionalBracketsOn() {
    const params = {
        name: Types.string.optional
    };

    typecheck(optionalBracketsOn, params, arguments);
}

const errorMessage = 'optionalBracketsOn(name) name expected a String but received a Number: 1.';

describe('Config.optionalBracketsOn', () => {
    it(errorMessage, () => {
        try {
            Config.setup({
                optionalBracketsOn: false
            });

            optionalBracketsOn(1);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 =
        'optionalBracketsOn(name) [name] expected a String but received a Number: 1.';

    it(errorMessage2, () => {
        try {
            Config.reset();

            optionalBracketsOn(1);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });
});
