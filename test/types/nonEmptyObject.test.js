import { Types, typecheck } from '../../src';

describe('Types.nonEmptyObject', () => {
    it('type name to be correct', () => {
        expect(Types.nonEmptyObject.typeName).toBe('nonEmptyObject');
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.nonEmptyObject
                },
                [{}]
            );
        }).toThrow('{obj} obj expected a non-empty Object but received an Object: {}.');
    });
});
