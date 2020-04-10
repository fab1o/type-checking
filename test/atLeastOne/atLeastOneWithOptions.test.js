import { Types, typecheck } from '../../src';

function addSudentWithOptions(options) {
    const innerParams = {
        name: Types.string.optional,
        year: Types.number.optional
    };

    typecheck.atLeastOne(addSudentWithOptions, innerParams, options);
}

describe('typecheck.atLeastOne with Options object', () => {
    it('not throw an error', () => {
        expect(() => {
            addSudentWithOptions({
                name: 'Fabio'
            });
        }).not.toThrow();
    });

    it('throw an error', () => {
        expect(() => {
            addSudentWithOptions('Fabio');
        }).toThrow(SyntaxError);
    });

    const errorMessage =
        'addSudentWithOptions({ name, year }) at least one parameter must be provided.';

    it(errorMessage, () => {
        try {
            addSudentWithOptions({});

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessage2 =
        'typecheck(...) arguments expected an Array or an Object. Make sure you configure params and invoke typecheck correctly.';

    it(errorMessage2, () => {
        try {
            addSudentWithOptions(false);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage2);
        }
    });
});
