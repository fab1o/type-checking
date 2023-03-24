import { Types, typecheck } from '../../src';

describe('param enclosed', () => {
    const params = {
        objs: Types.array.of.object({
            name: Types.string
        }).optional
    };

    it('throws an error', () => {
        expect(() => {
            typecheck(params, [[]]);
        }).not.toThrow();
    });

    it('throws an error with empty object', () => {
        expect(() => {
            typecheck(params, [[{}]]);
        }).toThrow('{[{name}]} objs.name expected a String but received undefined.');
    });

    it('throws another error', () => {
        expect(() => {
            typecheck(params, [
                [
                    {
                        name: null
                    }
                ]
            ]);
        }).toThrow('{[{name}]} objs.name expected a String but received null.');
    });
});
