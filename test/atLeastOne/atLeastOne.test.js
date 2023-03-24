import { Types, typecheck } from '../../src';

function addSudent() {
    const params = {
        name: Types.string.optional,
        year: Types.number.optional
    };

    typecheck.atLeastOne(addSudent, params, arguments);
}

describe('typecheck.atLeastOne', () => {
    it('not throw an error', () => {
        expect(() => {
            typecheck.atLeastOne(
                {
                    options: Types.object({
                        name: Types.string.optional,
                        year: Types.number.optional
                    })
                },
                [{ name: 'Fabio', year: 2020 }]
            );
        }).not.toThrow();
    });

    it('no argument is provided', () => {
        expect(() => {
            addSudent();
        }).toThrow('addSudent(name, year) at least one parameter must be provided.');
    });

    it('throw an error', () => {
        expect(() => {
            addSudent(false);
        }).toThrow(
            'addSudent(name, year) name expected a String or null or undefined but received a Boolean: false.'
        );
    });
});
