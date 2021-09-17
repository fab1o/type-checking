import { Types, typecheck } from '../../src';

describe.skip('Types.undefined', () => {
    it('type name to be correct', () => {
        expect(Types.undefined.typeName).toBe('undefined');
    });

    it('throws no error', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.undefined
                },
                [undefined]
            );
        }).not.toThrow();
    });

    it('throws error', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.undefined
                },
                [null]
            );
        }).toThrow('{name} name expected undefined but received null.');
    });
});
