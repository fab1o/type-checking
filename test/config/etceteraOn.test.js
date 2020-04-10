import { Config, typecheck } from '../../src';

import Child from '../class/relationship/method/child';

const errorMessage =
    'Child.method({ code, isActive }) options.code expected a Number but received undefined.';

describe('Config.etceteraOn', () => {
    it(errorMessage, () => {
        try {
            Config.setup({
                etceteraOn: false
            });

            const child = new Child();

            child.method({
                name: 'Fabio'
            });

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 =
        'Child.method({ code, isActive, ... }) options.code expected a Number but received undefined.';

    it(errorMessage2, () => {
        try {
            Config.reset();

            const child = new Child();

            child.method({
                name: 'Fabio'
            });

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });
});
