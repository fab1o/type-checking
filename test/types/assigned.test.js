import { Types, typecheck } from '../../src';

describe('Types.assigned', () => {
    it('type name to be correct', () => {
        expect(Types.assigned.typeName).toBe('assigned');
    });

    it('not throws an error', () => {
        expect(() => {
            typecheck(
                {
                    param: Types.assigned
                },
                [1]
            );
        }).not.toThrow();
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    param: Types.assigned
                },
                [null]
            );
        }).toThrow('{param} param expected an assigned value but received null');
    });
});
