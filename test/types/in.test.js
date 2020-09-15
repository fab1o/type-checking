import { Types, typecheck } from '../../src';

const Colors = {
    r: 'red',
    y: 'yellow',
    g: 'green'
};

const ColorsArray = ['red', 'yellow', 'green'];

describe('Types.in', () => {
    it('throws an error', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.in(Colors)
                },
                [null]
            );
        }).toThrow(
            '{color} color expected one of ["red","yellow","green"] but received null.'
        );
    });

    it('throws an error with array', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.in(ColorsArray)
                },
                [null]
            );
        }).toThrow(
            '{color} color expected one of ["red","yellow","green"] but received null.'
        );
    });

    it('throws no error', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.in(Colors)
                },
                ['red']
            );
        }).not.toThrow();
    });

    it('throws no error with array', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.in(ColorsArray)
                },
                ['red']
            );
        }).not.toThrow();
    });
});
