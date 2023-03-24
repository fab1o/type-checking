import { Types, typecheck } from '../../src';

const aaa = (...args) => {
    const params = {
        isOk: Types.boolean
    };

    typecheck('saveAccount', params, args);
};

const bbb = (...args) => {
    const params = {
        isOk: Types.boolean
    };

    typecheck(bbb, params, args);
};

describe('obfuscated function', () => {
    beforeAll(() => {
        Object.defineProperty(bbb, 'name', { value: 'saveAccount', writable: true });
    });

    it('throw an error', () => {
        expect(() => {
            aaa();
        }).toThrow('saveAccount(isOk) isOk expected a Boolean but received undefined.');

        expect(() => {
            bbb();
        }).toThrow('saveAccount(isOk) isOk expected a Boolean but received undefined.');
    });
});
