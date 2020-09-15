import { Types, typecheck } from '../../src';

describe('Types.nonEmptyObject', () => {
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
