import { Types, typecheck } from '../../src';

function createAccountWithOptions(options) {
    const params = {
        options: Types.object({
            name: Types.string,
            isActive: Types.boolean
        })
    };

    typecheck(createAccountWithOptions, params, { options });
}

function createAccount(name, isActive = false) {
    const params = {
        name: Types.string,
        isActive: Types.boolean.optional
    };

    typecheck(createAccount, params, { name, isActive });
}

describe('function using object as argument for input', () => {
    it('throws an Error on options', () => {
        expect(() => {
            createAccountWithOptions();
        }).toThrow(
            'createAccountWithOptions(options) options expected an Object but received undefined.'
        );
    });

    it('does not throw an Error on options.', () => {
        expect(() => {
            createAccountWithOptions({
                name: '',
                isActive: true
            });
        }).not.toThrow();
    });

    it('throws an Error in inner param', () => {
        expect(() => {
            createAccountWithOptions({
                name: null
            });
        }).toThrow(
            'createAccountWithOptions({name, isActive}) options.name expected a String but received null.'
        );
    });

    it('throws an Error', () => {
        expect(() => {
            createAccount();
        }).toThrow(
            'createAccount(name, isActive) name expected a String but received undefined.'
        );
    });

    it('does not throw an Error.', () => {
        expect(() => {
            createAccount('', true);
        }).not.toThrow();
    });
});
