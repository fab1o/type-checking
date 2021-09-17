import { Config, Types, typecheck } from '../src';

describe('typecheck.logging', () => {
    let myLogger;

    beforeEach(() => {
        myLogger = {
            // log(message) {
            //     this.logMessage = message;
            // },
            // info(message) {
            //     this.infoMessage = message;
            // },
            warn(message) {
                this.warnMessage = message;
            }
            // , error(message) {
            //     this.errorMessage = message;
            // }
        };

        Config.setup({
            logger: myLogger
        });
    });

    afterAll(() => {
        Config.reset();
    });

    it.skip('typecheck sucessfully presents error message on setup for log', () => {
        expect(() => {
            typecheck.log(
                {
                    a: Types.wrong
                },
                [null]
            );
        }).toThrow('typecheck.log(...) params expected an Object built with Types.');
    });

    it.skip('typecheck sucessfully presents error message on setup for warn', () => {
        expect(() => {
            typecheck.warn(
                {
                    a: Types.wrong
                },
                [null]
            );
        }).toThrow('typecheck.warn(...) params expected an Object built with Types.');
    });

    it.skip('typecheck sucessfully with a log', () => {
        expect(() => {
            typecheck.log(
                {
                    a: Types.number
                },
                [null]
            );
        }).not.toThrow();

        expect(myLogger.logMessage).toBe('{a} a expected a Number but received null.');
    });

    it('typecheck sucessfully with a warn', () => {
        expect(() => {
            typecheck.warn(
                {
                    a: Types.number
                },
                [null]
            );
        }).not.toThrow();

        expect(myLogger.warnMessage).toBe('{a} a expected a Number but received null.');
    });

    it.skip('typecheck sucessfully with an error log', () => {
        expect(() => {
            typecheck.error(
                {
                    a: Types.number
                },
                [null]
            );
        }).not.toThrow();

        expect(myLogger.errorMessage).toBe('{a} a expected a Number but received null.');
    });

    it.skip('typecheck sucessfully respects priority of logging types', () => {
        expect(() => {
            typecheck.info(
                {
                    a: Types.number,
                    b: Types.number.undefinable.error
                },
                [undefined, null]
            );
        }).not.toThrow();

        expect(myLogger.infoMessage).toBe(
            '{a, b} a expected a Number but received undefined.'
        );
        expect(myLogger.errorMessage).toBe(
            '{a, b} b expected a Number or undefined but received null.'
        );
    });

    it('log warn and not throw an error when value is not an array', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.object({
                        a: Types.number.log,
                        b: Types.string.info
                    }).warn
                },
                [false]
            );
        }).not.toThrow();

        expect(myLogger.warnMessage).toBe(
            '{array} array expected an Array of objects but received a Boolean: false.'
        );
    });

    it.skip('log a warn and throw no error when value is not an object', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.object({
                        a: Types.number.log,
                        b: Types.string.info
                    }).warn
                },
                [false]
            );
        }).not.toThrow();

        expect(myLogger.logMessage).toBeUndefined();

        expect(myLogger.infoMessage).toBeUndefined();

        expect(myLogger.warnMessage).toBe(
            '{obj} obj expected an Object but received a Boolean: false.'
        );
    });

    it.skip('log warn and throws no error when value is object but its properties are wrong', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.object({
                        a: Types.number.log,
                        b: Types.string.info
                    }).warn
                },
                [
                    {
                        a: true,
                        b: 1
                    }
                ]
            );
        }).not.toThrow();

        expect(myLogger.logMessage).toBe(
            '{{ a, b }} obj.a expected a Number but received a Boolean: true.'
        );

        expect(myLogger.infoMessage).toBe(
            '{{ a, b }} obj.b expected a String but received a Number: 1.'
        );

        expect(myLogger.warnMessage).toBeUndefined();
    });
});
