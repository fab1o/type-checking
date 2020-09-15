import { Config, Types, typecheck } from '../../src';

class MyError extends Error {}

describe('Config.ErrorType', () => {
    it('config.Error is MyError after configuring typecheck.', () => {
        expect(() => {
            Config.setup({
                ErrorType: MyError
            });

            typecheck({ a: Types.number }, [null]);
        }).toThrow(MyError);

        expect(Config.ErrorType).toBe(MyError);
    });

    it('config.Error is still MyError after typecheck is called for the second time.', () => {
        expect(() => {
            typecheck({ a: Types.number }, [null]);
        }).toThrow(MyError);
    });

    it('config.Error is SyntaxError after a reset.', () => {
        expect(() => {
            Config.reset();

            typecheck({ a: Types.number }, [null]);
        }).toThrow(SyntaxError);
    });
});
