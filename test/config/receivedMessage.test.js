import { Config, Types, typecheck } from '../../src';

describe.skip('Config.receivedMessage', () => {
    function received() {
        const params = {
            name: Types.string
        };

        typecheck(received, params, arguments);
    }

    afterAll(() => {
        Config.reset();
    });

    it('but was given', () => {
        expect(() => {
            Config.setup({
                receivedMessage: 'but was given'
            });

            received();
        }).toThrow('received(name) name expected a String but was given undefined.');
    });

    it('reset', () => {
        expect(() => {
            Config.reset();

            received();
        }).toThrow('received(name) name expected a String but received undefined.');
    });
});
