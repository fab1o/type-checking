import { Config, Types, typecheck } from '../../../src';

describe('Types.custom()', () => {
    it('an Error is not thrown when custom is optional.', () => {
        expect(() => {
            typecheck(
                {
                    c: Types.custom().optional
                },
                []
            );
        }).not.toThrow();
    });

    it.skip('an Error is not thrown when custom is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    c: Types.custom().nullable
                },
                [null]
            );
        }).not.toThrow();
    });

    it.skip('an Error when using Types.custom.', () => {
        expect(() => {
            typecheck(
                {
                    c: Types.custom
                },
                [null]
            );
        }).toThrow('typecheck(...) params expected an Object built with Types.');
    });

    it.skip('throw error when validator throws an error', () => {
        const myLogger = {
            log(message, ex) {
                this.message = ex.message;
            }
        };

        Config.setup({
            logger: myLogger
        });

        expect(() => {
            typecheck(
                {
                    c: Types.custom(() => {
                        throw Error('My Error');
                    })
                },
                [1]
            );
        }).toThrow('{c} c expected custom but received a Number: 1.');

        expect(myLogger.message).toBe('My Error');
    });

    it.skip('does not throw error when validator throws an error with a warn', () => {
        const myLogger = {
            log(message, ex) {
                this.logMessage = ex.message;
            },
            warn(message) {
                this.warnMessage = message;
            }
        };

        Config.setup({
            logger: myLogger
        });

        expect(() => {
            typecheck(
                {
                    c: Types.custom(() => {
                        throw new Error('My Error');
                    }).warn
                },
                [null]
            );
        }).not.toThrow();

        expect(myLogger.logMessage).toBe('My Error');
        expect(myLogger.warnMessage).toBe('{c} c expected custom but received null.');
    });
});
