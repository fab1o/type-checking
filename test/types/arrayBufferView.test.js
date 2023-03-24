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

    it('throws an error when data is correct', () => {
        expect(() => {
            const buffer = new ArrayBuffer(16);

            typecheck(
                {
                    view: Types.arrayBufferView
                },
                [buffer]
            );
        }).toThrow(
            '{view} view expected an ArrayBufferView but received an ArrayBuffer: {}.'
        );
    });

    it('throws an error expected type', () => {
        expect(() => {
            typecheck(
                {
                    view: Types.arrayBufferView
                },
                [null]
            );
        }).toThrow('{view} view expected an ArrayBufferView but received null.');
    });

    it('does not throw an error for given type', () => {
        expect(() => {
            const view = new Uint16Array(16);

            typecheck(
                {
                    view: Types.arrayBufferView
                },
                [view]
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is undefined', () => {
        expect(() => {
            typecheck(
                {
                    view: Types.arrayBufferView.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is null', () => {
        expect(() => {
            typecheck(
                {
                    view: Types.arrayBufferView.optional
                },
                [null]
            );
        }).not.toThrow();
    });

    it.skip('does not throw an error when data is a string', () => {
        expect(() => {
            typecheck(
                {
                    view: Types.arrayBufferView.or.nonEmptyString
                },
                ['view']
            );
        }).not.toThrow();
    });
});
