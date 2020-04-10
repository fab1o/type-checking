import { Types, typecheck } from '../../src';

function addSudent(name, year) {
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

    const errorMessage = '{name, year} at least one parameter must be provided.';

    it(errorMessage, () => {
        try {
            typecheck.atLeastOne(
                {
                    name: Types.string.optional,
                    year: Types.number.optional
                },
                []
            );

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 = 'addSudent(name, year) at least one parameter must be provided.';

    it(errorMessage2, () => {
        try {
            addSudent();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });

    const errorMessage3 =
        'addSudent(name, year) [name] expected a String but received a Boolean: false.';

    it(errorMessage3, () => {
        try {
            addSudent(false);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage3);
        }
    });
});
