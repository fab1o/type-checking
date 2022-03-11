import { Check, Config, Types, typecheck } from '../../../src';

describe('Types.custom()', () => {
    it('type name to be correct', () => {
        expect(Types.custom().typeName).toBe('custom');
    });

    it('does not thrown when custom.', () => {
        expect(() => {
            const LikeObject = {
                variantId: '',
                version: 0,
                featureId: ''
            };

            typecheck(
                {
                    options: Types.object({
                        experiments: Types.custom((value) =>
                            Object.values(value).every((v) => Check.like(v, LikeObject))
                        )
                    })
                },
                [
                    {
                        experiments: Object.create(null, {
                            '50365f0d&&test_demo': {
                                variantId: 'control',
                                version: 1,
                                featureId: '50365f0d&&test_demo'
                            }
                        })
                    }
                ]
            );
        }).not.toThrow();
    });

    it('does not thrown when custom is optional.', () => {
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

    it('throw error when validator throws an error', () => {
        const myLogger = {
            warn(message, ex) {
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

    it('does not throw error for a very customized type using userArguments', () => {
        expect(() => {
            const aValidator = (a, userArguments) => {
                const { b } = userArguments[0];

                const both = Check.assigned(b) && Check.nonEmptyString(a);
                const neither = Check.not.assigned(b) && Check.not.assigned(a);

                return both || neither;
            };

            const bValidator = (b, userArguments) => {
                const { a } = userArguments[0];

                const both = Check.assigned(a) && Check.greaterOrEqual(b, 0);
                const neither = Check.not.assigned(a) && Check.not.assigned(b);

                return both || neither;
            };

            typecheck(
                {
                    options: Types.object({
                        a: Types.custom(aValidator, 'a non-empty String if b is provided'),
                        b: Types.custom(bValidator, 'a value greater than 0 if a is provided')
                    })
                },
                [
                    {
                        a: 'string',
                        b: 2
                    }
                ]
            );
        }).not.toThrow();
    });
});
