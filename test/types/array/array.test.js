import { Types, typecheck } from '../../../src';

describe('Types.array', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array
                },
                []
            );
        }).toThrow('{array} array expected an Array but received undefined.');
    });

    it('an Error is not thrown when array is optional.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.optional
                },
                []
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when array is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.nullable
                },
                [null]
            );
        }).not.toThrow();
    });
});
