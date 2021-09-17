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
});
