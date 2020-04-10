import { Config, Types, typecheck } from '../../src';

function expectedMessage() {
    const params = {
        name: Types.string
    };

    typecheck(expectedMessage, params, arguments);
}

const errorMessage = 'expectedMessage(name) name should be a String but received undefined.';

describe('Config.expectedMessage', () => {
    it(errorMessage, () => {
        try {
            Config.setup({
                expectedMessage: 'should be'
            });

            expectedMessage();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 = 'expectedMessage(name) name expected a String but received undefined.';

    it(errorMessage2, () => {
        try {
            Config.reset();

            expectedMessage();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });
});
