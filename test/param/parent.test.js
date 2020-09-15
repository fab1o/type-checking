import { Types, typecheck } from '../../src';

describe('parent param name versus child param name', () => {
    it('throw an error - object first', () => {
        expect(() => {
            typecheck(
                {
                    name: Types.string,
                    friend: Types.object({
                        name: Types.number
                    })
                },
                ['Fabio', { name: null }]
            );
        }).toThrow('{name, { name }} friend.name expected a Number but received null.');
    });

    it('throw an error - object after', () => {
        expect(() => {
            typecheck(
                {
                    friend: Types.object({
                        name: Types.number
                    }),
                    name: Types.string
                },
                [{ name: 1 }, null]
            );
        }).toThrow('{{ name }, name} name expected a String but received null.');
    });
});
