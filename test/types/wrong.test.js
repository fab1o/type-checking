import { Types, typecheck } from '../../src';

describe('Types.wrong', () => {
    it('throws error because Types.wrong does not exist', () => {
        expect(() => {
            typecheck(
                {
                    wrong: Types.wrong
                },
                []
            );
        }).toThrow('typecheck(...) params expected an Object built with Types.');
    });

    it('throws error because Types.object does not exist', () => {
        expect(() => {
            typecheck(
                {
                    wrong: Types.object
                },
                []
            );
        }).toThrow('typecheck(...) params expected an Object built with Types.');
    });

    it('throws error because Types.custom does not exist', () => {
        expect(() => {
            typecheck(
                {
                    wrong: Types.custom
                },
                []
            );
        }).toThrow('typecheck(...) params expected an Object built with Types.');
    });

    it('throws error because Types.string() does not exist', () => {
        expect(() => {
            typecheck(
                {
                    wrong: Types.string()
                },
                []
            );
        }).toThrow('Types: expected Types.string not Types.string()');
    });

    it('throws error because Types.dateString({}) does not exist', () => {
        expect(() => {
            typecheck(
                {
                    wrong: Types.dateString({})
                },
                []
            );
        }).toThrow('Types: expected Types.dateString not Types.dateString()');
    });

    it('throws error because Types.wrong inside an object does not exist', () => {
        expect(() => {
            typecheck(
                {
                    opts: Types.object({
                        wrong: Types.wrong
                    })
                },
                [
                    {
                        something: true
                    }
                ]
            );
        }).toThrow('Types: opts.wrong expected a valid type from Types.');
    });
});
