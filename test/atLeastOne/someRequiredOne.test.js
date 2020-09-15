import { typecheck, Types } from '../../src';

/*
/* An example of a function that requires that at least one is provided
/* in a selective list of params
*/
function funcSomeRequiredOne() {
    const requiredOneOf = {
        name: Types.string.optional,
        year: Types.number.optional
    };

    const nonRequired = {
        dob: Types.date.undefinable
    };

    // must be put in the same order as function parameters
    const params = {
        ...requiredOneOf,
        ...nonRequired
    };

    typecheck('funcSomeRequiredOne', params, arguments);
    typecheck.atLeastOne('funcSomeRequiredOne', requiredOneOf, arguments);
}

function funcSomeRequiredOneWithOptions(options) {
    const requiredOneOf = {
        name: Types.string.optional,
        year: Types.number.optional
    };

    const nonRequired = {
        dob: Types.date.undefinable
    };

    const params = {
        options: Types.object({
            ...requiredOneOf,
            ...nonRequired
        })
    };

    typecheck('funcSomeRequiredOneWithOptions', params, arguments);
    // pass in options instead of arguments here:
    typecheck.atLeastOne('funcSomeRequiredOneWithOptions', requiredOneOf, options);
}

describe('someRequiredOne', () => {
    it('no argument is provided', () => {
        expect(() => {
            funcSomeRequiredOne(undefined, undefined, new Date());
        }).toThrow(
            'funcSomeRequiredOne(name, year) at least one parameter must be provided.'
        );
    });

    it('throws an error', () => {
        expect(() => {
            funcSomeRequiredOne(undefined, 2020, null);
        }).toThrow(
            'funcSomeRequiredOne(name, year, dob) dob expected a Date or undefined but received null.'
        );
    });

    it('still no argument is provided', () => {
        expect(() => {
            funcSomeRequiredOneWithOptions({
                dob: new Date()
            });
        }).toThrow(
            'funcSomeRequiredOneWithOptions({ name, year }) at least one parameter must be provided.'
        );
    });

    it('another error', () => {
        expect(() => {
            funcSomeRequiredOneWithOptions({
                dob: null,
                year: 2020
            });
        }).toThrow(
            'funcSomeRequiredOneWithOptions({ name, year, dob }) options.dob expected a Date or undefined but received null.'
        );
    });
});
