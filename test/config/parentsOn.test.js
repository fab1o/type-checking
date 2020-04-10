import { Config, Types, typecheck } from '../../src';

function parentsOn() {
    const params = {
        options: Types.object({
            name: Types.string
        })
    };

    typecheck(parentsOn, params, arguments);
}

const errorMessage = 'parentsOn({ name }) name expected a String but received null.';

describe('Config.parentsOn', () => {
    it(errorMessage, () => {
        try {
            Config.setup({
                parentsOn: false
            });

            parentsOn({
                name: null
            });

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 = 'parentsOn({ name }) options.name expected a String but received null.';

    it(errorMessage2, () => {
        try {
            Config.reset();

            parentsOn({
                name: null
            });

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });
});
