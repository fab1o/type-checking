import { Types, typecheck } from '../../src';

function addAccount() {
    const innerParams = {
        name: Types.string.optional,
        year: Types.number.optional
    };

    typecheck.atLeastOne(addAccount, innerParams, arguments);
}

describe('typecheck.atLeastOne with Options object', () => {
    it('throws an error', () => {
        expect(() => {
            addAccount({
                name: 'Fabio'
            });
        }).toThrow(
            'addAccount(name, year) name expected a String or null or undefined but received an Object: {name:"Fabio"}.'
        );
    });

    it('does not throw an error', () => {
        expect(() => {
            addAccount('Fabio');
        }).not.toThrow();
    });

    it('no argument is provided', () => {
        expect(() => {
            addAccount({});
        }).toThrow(
            'addAccount(name, year) name expected a String or null or undefined but received an Object: {}.'
        );
    });

    it('wrong argument is provided', () => {
        expect(() => {
            addAccount(false);
        }).toThrow(
            'addAccount(name, year) name expected a String or null or undefined but received a Boolean: false.'
        );
    });
});
