import { Types, typecheck } from '../src';

describe('typecheck', () => {
    it('match error message when no param is given', () => {
        try {
            typecheck();

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe('typecheck(...) params expected an Object built with Types.');
        }
    });

    it('match error message when empty params is given', () => {
        try {
            typecheck({});

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe('typecheck(...) params expected an Object built with Types.');
        }
    });

    it('match error message when input is given as null', () => {
        try {
            typecheck({ name: Types.string }, [null]);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe('{name} name expected a String but received null.');
        }
    });

    it('match error message when input is given as undefined', () => {
        try {
            typecheck({ name: Types.string }, undefined);

            expect.fail();
        } catch (ex) {
            expect(ex.message).toBe(
                'typecheck(...) arguments expected an Array or an Object. Make sure you configure params and invoke typecheck correctly.'
            );
        }
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
        try {
            typecheck({ a: Types.number }, [null], MyCustomError);

            expect.fail();
        } catch (ex) {
            expect(ex).toBeInstanceOf(MyCustomError);
        }
    });

    it('should throw MyCustomError on a function', () => {
        function checkA() {
            typecheck(checkA, { options: Types.object() }, arguments, MyCustomError);
        }

        try {
            checkA(null);

            expect.fail();
        } catch (ex) {
            expect(ex).toBeInstanceOf(MyCustomError);
        }
    });
});
