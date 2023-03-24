import { Config, Types, typecheck } from '../../src';

describe.skip('Config.expectedMessage', () => {
    function expectName() {
        const params = {
            name: Types.string
        };

        typecheck(expectName, params, arguments);
    }

    it('should be', () => {
        expect(() => {
            Config.setup({
                expectedMessage: 'should be'
            });

            expectName();
        }).toThrow('expectName(name) name should be a String but received undefined.');
    });

    it('reset', () => {
        expect(() => {
            Config.reset();

            expectName();
        }).toThrow('expectName(name) name expected a String but received undefined.');
    });
});
