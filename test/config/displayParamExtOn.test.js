import { Config, Types, typecheck } from '../../src';

function func() {
    const params = {
        name: Types.string.optional
    };

    typecheck(func, params, arguments);
}

describe('Config.displayParamExt', () => {
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
