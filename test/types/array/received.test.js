import { Types, typecheck } from '../../../src';

describe('received array of types message', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean
                },
                [[]]
            );
        }).toThrow('{ok} ok expected a Boolean but received an Array: [].');
    });

    it('multiple items', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean
                },
                [['Fabio', 1, 2020]]
            );
        }).toThrow('{ok} ok expected a Boolean but received an Array: ["Fabio", 1, ...].');
    });

    it('object in array', () => {
        expect(() => {
            typecheck(
                {
                    ok: Types.boolean
                },
                [[{ name: 'Fabio' }, 1, 2020]]
            );
        }).toThrow('{ok} ok expected a Boolean but received an Array: [{...}, 1, ...].');
    });
});
