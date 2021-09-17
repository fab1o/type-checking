import { Config, Types, typecheck } from '../../src';

describe('Config.ErrorType', () => {
    class MyError extends Error {}

    it('Config.DefaultError is TypeError.', () => {
        expect(Config.DefaultError).toBe(TypeError);
    });

    it('Config.Error is MyError after configuring typecheck.', () => {
        expect(() => {
            Config.setup({
                ErrorType: MyError
            });

            typecheck({ a: Types.number }, [null]);
        }).toThrow(MyError);

        expect(Config.ErrorType).toBe(MyError);
    });

    it('Config.Error is still MyError after typecheck is called for the second time.', () => {
        expect(() => {
            typecheck({ a: Types.number }, [null]);
        }).toThrow(MyError);
    });

    it('Config.Error is the default error which should be TypeError after a reset.', () => {
        expect(() => {
            Config.reset();

            typecheck({ a: Types.number }, [null]);
        }).toThrow(Config.DefaultError);
    });
});
