import { Types, typecheck, addType } from '../../src';

describe('addType - singular', () => {
    const isFabio = (value, input, ...args) => args.find((arg) => arg === value);

    addType('fabio', isFabio, {
        expectArgs: true
    });

    addType('apple', isFabio, {
        expectArgs: true,
        autoDisplayArgs: false
    });

    it('uses type any to check for fabio', () => {
        expect(() => {
            typecheck(
                {
                    letter: Types.fabio('f', 'a', 'b', 'i', 'o')
                },
                [null]
            );
        }).toThrow(
            '{letter} letter expected fabio: "f","a","b","i","o" but received null.'
        );
    });

    it('uses type any to check for apple', () => {
        expect(() => {
            typecheck(
                {
                    letter: Types.apple('a', 'p', 'p', 'l', 'e')
                },
                [null]
            );
        }).toThrow('{letter} letter expected apple but received null.');
    });
});
