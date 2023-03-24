import { Types, typecheck } from '../../src';

class A {
    static get name() {
        return 'Account';
    }

    constructor() {
        const params = {
            isOk: Types.boolean
        };

        typecheck(this, params, arguments);
    }

    saveAccount() {
        const params = {
            isOk: Types.boolean
        };

        typecheck(this, 'saveAccount', params, arguments);
    }
}

describe('obfuscated function', () => {
    it('throw an error', () => {
        expect(() => {
            new A();
        }).toThrow('Account(isOk) isOk expected a Boolean but received undefined.');

        expect(() => {
            const a = new A(true);

            a.saveAccount();
        }).toThrow(
            'Account.saveAccount(isOk) isOk expected a Boolean but received undefined.'
        );
    });
});
