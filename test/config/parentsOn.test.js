import { Config, Types, typecheck } from '../../src';

describe.skip('Config.parentsOn', () => {
    function parentsOn() {
        const params = {
            options: Types.object({
                name: Types.string
            })
        };

        typecheck(parentsOn, params, arguments);
    }

    afterAll(() => {
        Config.reset();
    });

    it('false', () => {
        expect(() => {
            Config.setup({
                parentsOn: false
            });

            parentsOn({
                name: null
            });
        }).toThrow('parentsOn({ name }) name expected a String but received null.');
    });

    it('reset', () => {
        expect(() => {
            Config.reset();

            parentsOn({
                name: null
            });
        }).toThrow('parentsOn({ name }) options.name expected a String but received null.');
    });
});
