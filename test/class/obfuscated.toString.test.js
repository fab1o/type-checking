import { Types, typecheck } from '../../src';

class A {
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

    toString() {
        return 'Account';
    }
}

describe('obfuscated function', () => {
    // Config.nameMethodPriority = Config.NameMethod.toString;

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
