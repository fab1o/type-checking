import { typecheck, Types } from '../../src';

/*
/* An example of a function that requires that at least one is provided
/* in a selective list of params
*/
function funcSomeRequiredOne(name, year, dob) {
    const requiredOneOfParams = {
        name: Types.string.optional,
        year: Types.number.optional
    };

    const nonRequiredParams = {
        dob: Types.date.optional
    };

    // must be put in the same order as function parameters
    const params = {
        ...requiredOneOfParams,
        ...nonRequiredParams
    };

    typecheck('funcSomeRequiredOne', params, arguments);

    typecheck.atLeastOne('funcSomeRequiredOne', requiredOneOfParams, arguments);
}

function funcSomeRequiredOneWithOptions(options) {
    const requiredOneOfParams = {
        name: Types.string.optional,
        year: Types.number.optional
    };

    const nonRequiredParams = {
        dob: Types.date.optional
    };

    const params = {
        options: Types.object({
            ...requiredOneOfParams,
            ...nonRequiredParams
        })
    };

    typecheck('funcSomeRequiredOneWithOptions', params, arguments);

    // pass in options instead of arguments here:
    typecheck.atLeastOne('funcSomeRequiredOneWithOptions', requiredOneOfParams, options);
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
            funcSomeRequiredOne(undefined, 2020, 1);
        }).toThrow(
            'funcSomeRequiredOne(name, year, dob) dob expected a Date or null or undefined but received a Number: 1.'
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
                dob: 1,
                year: 2020
            });
        }).toThrow(
            'funcSomeRequiredOneWithOptions({ name, year, dob }) options.dob expected a Date or null or undefined but received a Number: 1.'
        );
    });
});
