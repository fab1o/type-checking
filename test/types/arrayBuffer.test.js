import { Types, typecheck } from '../../src';

describe('Types.arrayBuffer', () => {
    it('type name to be correct', () => {
        expect(Types.arrayBuffer.typeName).toBe('arrayBuffer');
    });

    it('type name of extented functions to be correct', () => {
        expect(Types.arrayBuffer.optional.typeName).toBe('arrayBuffer');
    });

    it('type name of logging functions to be correct', () => {
        expect(Types.arrayBuffer.warn.typeName).toBe('arrayBuffer');
    });

    it('throws an error when data is correct', () => {
        expect(() => {
            const buffer = new Int32Array(16);

            typecheck(
                {
                    ab: Types.arrayBuffer
                },
                [buffer]
            );
        }).toThrow(
            '{ab} ab expected an ArrayBuffer but received an Int32Array: 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.'
        );
    });

    it('throws an error expected type', () => {
        expect(() => {
            typecheck(
                {
                    ab: Types.arrayBuffer
                },
                [null]
            );
        }).toThrow('{ab} ab expected an ArrayBuffer but received null.');
    });

    it('throws an error for given type', () => {
        expect(() => {
            const ab = new Uint16Array(16);

            typecheck(
                {
                    ab: Types.arrayBuffer
                },
                [ab]
            );
        }).toThrow(
            '{ab} ab expected an ArrayBuffer but received an Uint16Array: 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.'
        );
    });

    it('does not throw an error when data is undefined', () => {
        expect(() => {
            typecheck(
                {
                    ab: Types.arrayBuffer.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('does not throw an error when data is null', () => {
        expect(() => {
            typecheck(
                {
                    ab: Types.arrayBuffer.optional
                },
                [null]
            );
        }).not.toThrow();
    });
});
