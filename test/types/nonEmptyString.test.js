import { Types, typecheck } from '../../src';

describe('Types.nonEmptyString', () => {
    it('type name to be correct', () => {
        expect(Types.nonEmptyString.typeName).toBe('nonEmptyString');
    });

    it('an Error is thrown when nonEmptyString is empty.', () => {
        expect(() => {
            typecheck(
                {
                    str: Types.nonEmptyString
                },
                ['']
            );
        }).toThrow('{str} str expected a non-empty String but received a String: "".');
    });

    it('an Error is not thrown when nonEmptyString has a string.', () => {
        expect(() => {
            typecheck(
                {
                    str: Types.nonEmptyString
                },
                ['string']
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when nonEmptyString is optional.', () => {
        expect(() => {
            typecheck(
                {
                    str: Types.nonEmptyString.optional
                },
                [null]
            );
        }).not.toThrow();
    });
});
