import { Types, typecheck } from '../../src';

describe('Types.arrayBufferView', () => {
    it('type name to be correct', () => {
        expect(Types.arrayBufferView.typeName).toBe('arrayBufferView');
    });

    it('type name of extented functions to be correct', () => {
        expect(Types.arrayBufferView.optional.typeName).toBe('arrayBufferView');
    });

    it('type name of logging functions to be correct', () => {
        expect(Types.arrayBufferView.warn.typeName).toBe('arrayBufferView');
    });

    it('does not throw an error when data is correct', () => {
        expect(() => {
            const buffer = new ArrayBuffer(16);

            typecheck(
                {
                    buffer: Types.arrayBufferView
                },
                [buffer]
            );
        }).toThrow(
            '{buffer} buffer expected an ArrayBufferView but received an ArrayBuffer.'
        );
    });

    it('throw an error expected type', () => {
        expect(() => {
            typecheck(
                {
                    buffer: Types.arrayBufferView
                },
                [null]
            );
        }).toThrow('{buffer} buffer expected an ArrayBufferView but received null.');
    });

    it('throw an error for given type', () => {
        expect(() => {
            const buffer = new Uint16Array(16);

            typecheck(
                {
                    buffer: Types.arrayBufferView
                },
                [buffer]
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is undefined', () => {
        expect(() => {
            typecheck(
                {
                    buffer: Types.arrayBufferView.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is null', () => {
        expect(() => {
            typecheck(
                {
                    buffer: Types.arrayBufferView.optional
                },
                [null]
            );
        }).not.toThrow();
    });

    it.skip('does not throw an error when data is a string', () => {
        expect(() => {
            typecheck(
                {
                    buffer: Types.arrayBufferView.or.nonEmptyString
                },
                ['buffer']
            );
        }).not.toThrow();
    });
});
