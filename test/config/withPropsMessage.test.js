import { Config, Types, typecheck } from '../../src';

function withProps() {
    const params = {
        options: Types.object({
            name: Types.string
        })
    };

    typecheck(withProps, params, arguments);
}

describe('Config.withPropsMessage', () => {
    it('with attributes', () => {
        expect(() => {
            Config.setup({
                withPropsMessage: 'with attributes'
            });

            withProps();
        }).toThrow(
            'withProps(options) options expected an Object with attributes but received undefined.'
        );
    });

    it('reset', () => {
        expect(() => {
            Config.reset();

            withProps();
        }).toThrow(
            'withProps(options) options expected an Object with properties but received undefined.'
        );
    });
});
