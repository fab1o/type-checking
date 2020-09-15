import { Config } from '../../src';

import Child from '../class/relationship/method/child';

describe('Config.etceteraOn', () => {
    it('false', () => {
        expect(() => {
            Config.setup({
                etceteraOn: false
            });

            const child = new Child();

            child.method({
                name: 'Fabio'
            });
        }).toThrow(
            'Child.method({ code, isActive }) options.code expected a Number but received undefined.'
        );
    });

    it('reset', () => {
        expect(() => {
            Config.reset();

            const child = new Child();

            child.method({
                name: 'Fabio'
            });

            expect.fail();
        }).toThrow(
            'Child.method({ code, isActive, ... }) options.code expected a Number but received undefined.'
        );
    });
});
