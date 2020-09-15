import { Config, Types, typecheck } from '../../src';

function received() {
    const params = {
        name: Types.string
    };

    typecheck(received, params, arguments);
}

describe('Config.receivedMessage', () => {
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
