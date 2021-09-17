import { Config, Types, typecheck } from '../../src';

describe('Types.skip', () => {
    afterAll(() => {
        Config.reset();
    });

    it('type name to be correct', () => {
        expect(Types.skip.typeName).toBe('skip');
    });

    it('throw error displaying the parameter in the error message with a skip type', () => {
        expect(() => {
            typecheck(
                'function',
                {
                    b: Types.string,
                    c: Types.skip
                },
                [1]
            );
        }).toThrow('function(b, c) b expected a String but received a Number: 1.');
    });

    it('does not throw an error on a skip type', () => {
        expect(() => {
            typecheck(
                {
                    b: Types.number,
                    c: Types.skip
                },
                [1]
            );
        }).not.toThrow();
    });

    it.skip('throw error for Types.array.of.skip', () => {
        expect(() => {
            typecheck(
                {
                    b: Types.array.of.skip
                },
                [1]
            );
        }).toThrow('typecheck(...) params expected an Object built with Types.');
    });

    it('throw error for Types.skip()', () => {
        expect(() => {
            typecheck(
                {
                    b: Types.skip()
                },
                [1]
            );
        }).toThrow('typecheck(...) params expected Types.skip not Types.skip()');
    });

    it('logs error on a skip type', () => {
        const myLogger = {
            warn(message) {
                this.message = message;
            }
        };

        Config.setup({
            logger: myLogger
        });

        expect(() => {
            typecheck(
                {
                    param: Types.skip.warn
                },
                [null]
            );
        }).not.toThrow();

        expect(myLogger.message).toBe('{param} param expected a value but received null.');
    });
});
