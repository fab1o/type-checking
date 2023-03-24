import { Config, Types, typecheck } from '../../src';

describe.skip('Config.displayParamExt', () => {
    function func() {
        const params = {
            name: Types.string.optional
        };

        typecheck(func, params, arguments);
    }

    it('false', () => {
        expect(() => {
            Config.setup({
                displayParamExt: false
            });

            func(1);
        }).toThrow('func(name) name expected a String but received a Number: 1.');
    });

    it('reset', () => {
        expect(() => {
            Config.reset();

            func(1);
        }).toThrow(
            'func(name) name expected a String or null or undefined but received a Number: 1.'
        );
    });
});
