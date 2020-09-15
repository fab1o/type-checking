import { Types, typecheck } from '../../src';

const Colors = {
    red: '',
    yellow: '',
    green: ''
};

const ColorsArray = ['red', 'yellow', 'green'];

describe('Types.keyIn', () => {
    it('throws an error', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.keyIn(Colors)
                },
                [null]
            );
        }).toThrow(
            '{color} color expected as a key in ["red","yellow","green"] but received null.'
        );
    });

    it('throws an error with array', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.keyIn(ColorsArray)
                },
                [null]
            );
        }).toThrow('{color} color expected as a key in ["0","1","2"] but received null.');
    });

    it('throws no error', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.keyIn(Colors)
                },
                ['red']
            );
        }).not.toThrow();
    });

    it('throws no error with array', () => {
        expect(() => {
            typecheck(
                {
                    color: Types.keyIn(ColorsArray)
                },
                [1]
            );
        }).not.toThrow();
    });
});
