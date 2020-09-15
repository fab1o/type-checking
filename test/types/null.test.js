import { Types, typecheck } from '../../src';

describe('Types.null', () => {
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
