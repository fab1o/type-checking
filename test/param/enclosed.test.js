import { Types, typecheck } from '../../src';

function objectEnclosedByArray(objs) {
    const params = {
        objs: Types.array.of.object({
            name: Types.string
        }).optional
    };

    typecheck(objectEnclosedByArray, params, arguments);
}

describe('param enclosed', () => {
    it('throws an error', () => {
        expect(() => {
            objectEnclosedByArray([]);
        }).not.toThrow();
    });

    it('throws an error with empty object', () => {
        expect(() => {
            objectEnclosedByArray([{}]);
        }).toThrow(
            'objectEnclosedByArray([{ name }]) objs.name expected a String but received undefined.'
        );
    });

    it('throws another error', () => {
        expect(() => {
            objectEnclosedByArray([
                {
                    name: null
                }
            ]);
        }).toThrow(
            'objectEnclosedByArray([{ name }]) objs.name expected a String but received null.'
        );
    });
});
