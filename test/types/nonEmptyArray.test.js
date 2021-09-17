import { Types, typecheck } from '../../src';

describe.skip('Types.nonEmptyArray', () => {
    it('type name to be correct', () => {
        expect(Types.nonEmptyArray.typeName).toBe('nonEmptyArray');
    });

    it('an Error is thrown when nonEmptyArray is empty.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray
                },
                [[]]
            );
        }).toThrow('{array} array expected a non-empty Array but received an Array: [].');
    });

    it('an Error is not thrown when nonEmptyArray has a number.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray
                },
                [[1]]
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when nonEmptyArray as a string.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray
                },
                [['']]
            );
        }).not.toThrow();
    });

    it('an Error is thrown when nonEmptyArray.of.string is empty.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.string
                },
                [[]]
            );
        }).toThrow('');
    });

    it('an Error is not thrown when nonEmptyArray.of.string is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.string.nullable
                },
                [null]
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when nonEmptyArray.of.object() is optional.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.object().optional
                },
                []
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when nonEmptyArray.of.object() is optional and given empty array.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.object().optional
                },
                [[]]
            );
        }).toThrow(
            '{array} array expected a non-empty Array of objects or null or undefined but received an Array: [].'
        );
    });

    it('an Error is not thrown when nonEmptyArray.of.number is optional and given empty array.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.number.optional
                },
                [[]]
            );
        }).toThrow(
            '{array} array expected a non-empty Array of numbers or null or undefined but received an Array: [].'
        );
    });

    it.skip('an Error is not thrown when nonEmptyArray.of.array.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.array
                },
                [[[]]]
            );
        }).not.toThrow();
    });

    it.skip('an Error is not thrown when array.of.nonEmptyArray.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.nonEmptyArray
                },
                [[[1]]]
            );
        }).not.toThrow();
    });

    it('an Error is thrown when nonEmptyArray.of.array.of.string', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.array.of.string
                },
                [[[]]]
            );
        }).toThrow(TypeError);
    });

    it('an Error is thrown when array.of.nonEmptyArray.of.string.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.nonEmptyArray.of.string
                },
                [[[true]]]
            );
        }).toThrow(TypeError);
    });

    it('an Error is thrown when nonEmptyArray.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray
                },
                [[]]
            );
        }).toThrow('{array} array expected a non-empty Array but received an Array: [].');
    });

    it.skip('an Error is thrown when array.of.nonEmptyArray.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.array.of.nonEmptyArray
                },
                [[[], []]]
            );
        }).toThrow(
            '{array} array expected an Array of non-empty arrays but received an Array: [[], []].'
        );
    });

    it('an Error is thrown when nonEmptyArray.of.object.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.object({
                        a: Types.string
                    })
                },
                [[{ a: 1 }]]
            );
        }).toThrow('{[{ a }]} array.a expected a String but received a Number: 1.');
    });

    it('an Error is thrown when nonEmptyArray.of.array.of.nonEmptyArray.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.array.of.nonEmptyArray
                },
                [[[1]]]
            );
        }).toThrow(TypeError);
    });

    it('an Error is thrown when nonEmptyArray.of.array.of.array.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.array.of.array
                },
                [[[1]]]
            );
        }).toThrow(TypeError);
    });

    it('an Error is thrown when nonEmptyArray.of.nonEmptyArray.of.nonEmptyArray.', () => {
        expect(() => {
            typecheck(
                {
                    array: Types.nonEmptyArray.of.nonEmptyArray.of.nonEmptyArray
                },
                [[[1]]]
            );
        }).toThrow(TypeError);
    });
});
