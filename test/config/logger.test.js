import { Config, Types, typecheck } from '../../src';

describe('Config.logger', () => {
    class MyLogger {
        // log(message) {
        //     this.message = message;
        // }

        // info(message) {
        //     this.message = message;
        // }

        warn(message) {
            this.message = message;
        }

        // error(message) {
        //     this.message = message;
        // }
    }

    const myLogger = new MyLogger();

    beforeAll(() => {
        Config.setup({
            logger: myLogger
        });
    });

    afterAll(() => {
        Config.reset();
    });

    it('config.logger is MyLogger after configuring typecheck.', () => {
        expect(() => {
            typecheck(
                {
                    a: Types.number.warn
                },
                [null]
            );
        }).not.toThrow();

        expect(myLogger.message).toBe('{a} a expected a Number but received null.');
    });

    it('config.logger is still MyLogger after typecheck is called for the second time.', () => {
        expect(() => {
            typecheck(
                {
                    b: Types.string.warn
                },
                [null]
            );
        }).not.toThrow();

        expect(myLogger.message).toBe('{b} b expected a String but received null.');
    });
});
