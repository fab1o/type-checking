import { Config, Types, typecheck } from '../../src';

class MyError extends Error {}

describe('Config.errorType', () => {
    it('config.Error is MyError after configuring typecheck.', () => {
        try {
            Config.setup({
                errorType: MyError
            });

            typecheck({ a: Types.number }, [null]);

            expect.fail();
        } catch (ex) {
            expect(ex).toBeInstanceOf(MyError);
        }
    });

    it('config.Error is still MyError after typecheck is called for the second time.', () => {
        try {
            typecheck({ a: Types.number }, [null]);

            expect.fail();
        } catch (ex) {
            expect(ex).toBeInstanceOf(MyError);
        }
    });

    it('config.Error is SyntaxError after a reset.', () => {
        try {
            Config.reset();

            typecheck({ a: Types.number }, [null]);

            expect.fail();
        } catch (ex) {
            expect(ex).toBeInstanceOf(SyntaxError);
        }
    });
});
