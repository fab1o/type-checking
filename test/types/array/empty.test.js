import { Types, typecheck } from '../../../src';

describe('Types.array.of.object()', () => {
    it('throw no error when passing an empty array.', () => {
        expect(() => {
            typecheck(
                {
                    objs: Types.array.of.object()
                },
                [[]]
            );
        }).not.toThrow();
    });

    it('expect to throw an error when passing an empty array.', () => {
        expect(() => {
            typecheck(
                {
                    objs: Types.array.of.object()
                },
                [[, , , ,]]
            );
        }).toThrow(
            '{objs} objs expected an Array of objects but received an Array: [undefined, undefined, ...].'
        );
    });
});
