import { Types, typecheck } from '../../src';

describe('typecheck.atLeastOne with Options object', () => {
    function addAccount() {
        const params = {
            name: Types.string.optional,
            year: Types.number.optional
        };

        typecheck.atLeastOne(addAccount, params, arguments);
    }

    function addPerson(opts) {
        const params = {
            opts: Types.object({
                name: Types.string.optional,
                year: Types.number.optional,
                opts: Types.object({
                    name: Types.string.optional,
                    year: Types.number.optional
                })
            })
        };

        typecheck.atLeastOne(addPerson, params, arguments);
    }

    it('throws an error for no argument', () => {
        expect(() => {
            addAccount();
        }).toThrow('addAccount(name, year) at least one parameter must be provided.');
    });

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

    it('throws an error for options', () => {
        expect(() => {
            addPerson({
                name: 'name',
                opts: {}
            });
        }).toThrow(
            'addPerson({name, year, {name, year}}) at least one parameter must be provided.'
        );
    });
});
