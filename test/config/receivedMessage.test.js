import { Config, Types, typecheck } from '../../src';

function receivedMessage() {
    const params = {
        name: Types.string
    };

    typecheck(receivedMessage, params, arguments);
}

const errorMessage = 'receivedMessage(name) name expected a String but was given undefined.';

describe('Config.receivedMessage', () => {
    it(errorMessage, () => {
        try {
            Config.setup({
                receivedMessage: 'but was given'
            });

            receivedMessage();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 = 'receivedMessage(name) name expected a String but received undefined.';

    it(errorMessage2, () => {
        try {
            Config.reset();

            receivedMessage();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });
});
