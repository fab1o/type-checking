import { Config, Types, typecheck } from '../../src';

function withPropsMessage() {
    const params = {
        options: Types.object({
            name: Types.string
        })
    };

    typecheck(withPropsMessage, params, arguments);
}

const errorMessage =
    'withPropsMessage(options) options expected an Object with attributes but received undefined.';

describe('Config.withPropsMessage', () => {
    it(errorMessage, () => {
        try {
            Config.setup({
                withPropsMessage: 'with attributes'
            });

            withPropsMessage();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 =
        'withPropsMessage(options) options expected an Object with properties but received undefined.';

    it(errorMessage2, () => {
        try {
            Config.reset();

            withPropsMessage();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });
});
