import { Types, typecheck } from '../../../src';

describe('Types.array.of.object', () => {
    it('not to throw an error', () => {
        expect(() => {
            typecheck(
                {
                    years: Types.array.of.object({
                        name: Types.string
                    })
                },
                [
                    [
                        {
                            name: 'name1'
                        },
                        {
                            name: 'name2'
                        }
                    ]
                ]
            );
        }).not.toThrow();
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    years: Types.array.of.number
                },
                [
                    [
                        {
                            name: 'name1'
                        },
                        {
                            name: 'name2'
                        }
                    ]
                ]
            );
        }).toThrow(
            '{years} years expected an Array of numbers but received an Array: [{...}, {...}].'
        );
    });
});
