import { Config, Types, typecheck } from '../../src';

describe.skip('Types.type.or.type', () => {
    const Colors = {
        r: 'red',
        y: 'yellow',
        g: 'green'
    };

    afterAll(() => {
        Config.reset();
    });

    it('throws no error when value is a string or part of enum', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.in(Colors).or.string
                },
                ['purple']
            );
        }).not.toThrow();
    });

    it('throws no error for optional type.or.type', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.in(Colors).or.string.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('throws no error when value is not part of enum', () => {
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
                    color: Types.in(Colors).or.string
                },
                ['']
            );
        }).not.toThrow();

        expect(myLogger.message).toBe(
            '{color} color expected one of ["red","yellow","green"] but received a String: "".'
        );
    });

    it('throws no error when value is part of enum or a non-empty string', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.in(Colors).or.nonEmptyString
                },
                ['black']
            );
        }).not.toThrow();
    });

    it('throws no error when value is null for optional or', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.in(Colors).or.nonEmptyString.optional
                },
                [null]
            );
        }).not.toThrow();
    });

    it('throws error when value is part of enum or a non-empty string', () => {
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
                    color: Types.in(Colors).or.nonEmptyString
                },
                ['']
            );
        }).toThrow(
            '{color} color expected one of ["red","yellow","green"] or a non-empty String but received a String: "".'
        );

        expect(myLogger.message).toBe(
            '{color} color expected one of ["red","yellow","green"] but received a String: "".'
        );
    });
});
