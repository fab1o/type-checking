import { Types, typecheck } from '../src';

describe('typecheck', () => {
    it('typechecks sucessfully works with simple objects', () => {
        expect(() => {
            const params = {
                name: Types.string,
                isActive: Types.boolean
            };
            const data = {
                name: 'name',
                isActive: true
            };

            typecheck(params, data);
        }).not.toThrow();
    });

    it('typechecks sucessfully works with simple array', () => {
        expect(() => {
            const params = {
                name: Types.string,
                isActive: Types.boolean
            };
            const data = ['name', true];

            typecheck(params, data);
        }).not.toThrow();
    });

    it('typechecks sucessfully', () => {
        expect(() => {
            typecheck(
                {
                    b: Types.number
                },
                [1]
            );
        }).not.toThrow();
    });

    it('match error message when no param is given', () => {
        expect(() => {
            typecheck();
        }).toThrow('typecheck(...) params expected an Object built with Types.');
    });

    it('match error message when empty params is given', () => {
        expect(() => {
            typecheck({});
        }).toThrow('typecheck(...) params expected an Object built with Types.');
    });

    it('match error message when input is given as null', () => {
        expect(() => {
            typecheck({ name: Types.string }, [null]);
        }).toThrow('{name} name expected a String but received null.');
    });

    it('match error message when input is given as undefined', () => {
        expect(() => {
            typecheck({ name: Types.string }, undefined);
        }).toThrow(
            'typecheck(...) arguments expected an Array or an Object. Make sure you invoke typecheck correctly.'
        );
    });

    it('typecheck returns undefined', () => {
        const output = typecheck(
            {
                param: Types.boolean
            },
            [true]
        );

        expect(output).toBeUndefined();
    });

    class MyCustomError extends Error {}

    it('should throw MyCustomError on a simple typecheck', () => {
        expect(() => {
            typecheck({ a: Types.number }, [null], MyCustomError);
        }).toThrow(MyCustomError);
    });

    it('should throw MyCustomError on a function', () => {
        expect(() => {
            function checkA() {
                typecheck(checkA, { options: Types.object() }, arguments, MyCustomError);
            }

            checkA(null);
        }).toThrow(MyCustomError);
    });

    it('should not fail when user input is an object', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string,
                    year: Types.number,
                    active: Types.boolean
                },
                {
                    active: true,
                    name: '',
                    year: 2020
                }
            );
        }).not.toThrow();
    });

    it('should not fail when user input is a user array of arguments', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string,
                    year: Types.number,
                    active: Types.boolean
                },
                ['', 2020, true]
            );
        }).not.toThrow();
    });
});
