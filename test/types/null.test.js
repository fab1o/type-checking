import { Types, typecheck } from '../../src';

describe.skip('Types.null', () => {
    it('type name to be correct', () => {
        expect(Types.null.typeName).toBe('null');
    });

    it('throws no error', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.null
                },
                [null]
            );
        }).not.toThrow();
    });

    it('throws error', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.null
                },
                []
            );
        }).toThrow('{name} name expected null but received undefined.');
    });
});
