import { Config, Types, typecheck } from '../../src';

describe('Types.x.warn', () => {
    let spy;

    beforeEach(() => {
        spy = jest.spyOn(Config.logger, 'warn');
    });

    afterEach(() => {
        spy.mockRestore();
    });

    it('does not throw an error when validation fails', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean.warn
                },
                [null]
            );
        }).not.toThrow();

        expect(spy).toHaveBeenCalledWith('{ok} ok expected a Boolean but received null.');
    });

    it('does not throw an error for optional', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean.optional.warn
                },
                [null]
            );
        }).not.toThrow();

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it.skip('does not throw an error for nullable', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean.nullable.warn
                },
                [null]
            );
        }).not.toThrow();

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it.skip('does not throw an error for undefinable', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean.undefinable.warn
                },
                [undefined]
            );
        }).not.toThrow();

        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('does not throw an error when validation fails on an optional param', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean.optional.warn
                },
                ['string']
            );
        }).not.toThrow();

        expect(spy).toHaveBeenCalledWith(
            '{ok} ok expected a Boolean or null or undefined but received a String: "string".'
        );
    });

    it.skip('does not throw an error when validation fails on an nullable param', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean.nullable.warn
                },
                ['string']
            );
        }).not.toThrow();

        expect(spy).toHaveBeenCalledWith(
            '{ok} ok expected a Boolean or null but received a String: "string".'
        );
    });

    it.skip('does not throw an error when validation fails on an undefinable param', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean.undefinable.warn
                },
                ['string']
            );
        }).not.toThrow();

        expect(spy).toHaveBeenCalledWith(
            '{ok} ok expected a Boolean or undefined but received a String: "string".'
        );
    });
});
