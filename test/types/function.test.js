import { Types, typecheck } from '../../src';

describe('Types.function', () => {
    it('type name to be correct', () => {
        expect(Types.function.typeName).toBe('function');
    });

    it('does not throw an error', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.function
                },
                [() => {}]
            );
        }).not.toThrow();
    });

    it('throw an error with arrow function', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean
                },
                [() => {}]
            );
        }).toThrow('{ok} ok expected a Boolean but received a Function.');
    });

    it('throw an error with variable function', () => {
        expect(() => {
            const func = function () {};

            typecheck(
                {
                    ok: Types.boolean
                },
                [func]
            );
        }).toThrow('{ok} ok expected a Boolean but received func.');
    });

    it('throw an error with named function', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean
                },
                [function Test() {}]
            );
        }).toThrow('{ok} ok expected a Boolean but received Test.');
    });

    it('throw an error on instance strict of a function', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.instanceStrict(() => {})
                },
                [0]
            );
        }).toThrow('{ok} ok expected an instance of a Function but received a Number: 0.');
    });

    it('throw an error on received a function', () => {
        expect(() => {
            const func = () => {};

            typecheck(
                {
                    ok: Types.string
                },
                [func]
            );
        }).toThrow('{ok} ok expected a String but received func.');
    });

    it('throw an error on received an annonymous function', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.string
                },
                [() => {}]
            );
        }).toThrow('{ok} ok expected a String but received a Function.');
    });

    it('throw an error on received array of functions', () => {
        expect(() => {
            const func = () => {};

            typecheck(
                {
                    ok: Types.array.of.string
                },
                [[func, () => {}]]
            );
        }).toThrow(
            '{ok} ok expected an Array of strings but received an Array: [func, a Function].'
        );
    });
});
