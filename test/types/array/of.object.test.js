import { Types, typecheck } from '../../../src';

describe('Types.array.of.object', () => {
    it('throw an error', () => {
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
});
