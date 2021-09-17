import { Config, Types, typecheck } from '../../src';

describe.skip('Config.loggerMethodForOrType', () => {
    const myLogger = {
        message: null,
        log(message) {
            this.message = message;
        }
    };

    const Colors = {
        r: 'red',
        y: 'yellow',
        g: 'green'
    };

    beforeAll(() => {
        Config.setup({
            logger: myLogger
        });
    });

    afterAll(() => {
        Config.reset();
    });

    it('does not log when setting is off', () => {
        Config.loggerMethodForOrType = null;

        expect(() => {
            typecheck(
                {
                    color: Types.in(Colors).or.string
                },
                ['']
            );
        }).not.toThrow();

        expect(myLogger.message).toBeNull();
    });

    it('logs when setting is on', () => {
        Config.loggerMethodForOrType = Config.LoggerMethod.log;

        expect(() => {
            typecheck(
                {
                    color: Types.in(Colors).or.string
                },
                ['']
            );
        }).not.toThrow();

        expect(myLogger.message).toBe(
            '{color} color expected one of ["red","yellow","green"] but received a String: "".'
        );
    });
});
