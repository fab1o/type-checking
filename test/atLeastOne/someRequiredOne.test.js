import { typecheck, Types } from '../../src';

/*
/* An example of a function that requires that at least one is provided
/* in a selective list of params
*/
function someRequiredOne(name, year, dob) {
    const requiredOneOf = {
        name: Types.string.optional,
        year: Types.number.optional
    };

    const nonRequired = {
        dob: Types.date.optional
    };

    // must be put in the same order as function parameters
    const params = {
        ...requiredOneOf,
        ...nonRequired
    };

    typecheck(someRequiredOne, params, arguments);
    typecheck.atLeastOne(someRequiredOne, requiredOneOf, arguments);
}

function someRequiredOneWithOptions(options) {
    const requiredOneOf = {
        name: Types.string.optional,
        year: Types.number.optional
    };

    const nonRequired = {
        dob: Types.date.optional
    };

    const params = {
        options: Types.object({
            ...requiredOneOf,
            ...nonRequired
        })
    };

    typecheck(someRequiredOneWithOptions, params, arguments);
    typecheck.atLeastOne(someRequiredOneWithOptions, requiredOneOf, options);
}

describe('someRequiredOne', () => {
    const errorMessage = 'someRequiredOne(name, year) at least one parameter must be provided.';

    it(errorMessage, () => {
        try {
            someRequiredOne(undefined, undefined, new Date());

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessage);
        }
    });

    const errorMessageDob =
        'someRequiredOne(name, year, dob) [dob] expected a Date but received null.';

    it(errorMessageDob, () => {
        try {
            someRequiredOne(undefined, 2020, null);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorMessageDob);
        }
    });

    const errorWithOptionsMessage =
        'someRequiredOneWithOptions({ name, year }) at least one parameter must be provided.';

    it(errorWithOptionsMessage, () => {
        try {
            someRequiredOneWithOptions({
                dob: new Date()
            });

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorWithOptionsMessage);
        }
    });

    const errorWithOptionsMessageDob =
        'someRequiredOneWithOptions({ name, year, dob }) [options.dob] expected a Date but received null.';

    it(errorWithOptionsMessageDob, () => {
        try {
            someRequiredOneWithOptions({
                dob: null,
                year: 2020
            });

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(errorWithOptionsMessageDob);
        }
    });
});
