import { Types, typecheck } from '../../src';

describe.skip('Types.wrong', () => {
    it('type name to be correct', () => {
        expect(Types.wrong).toBeUndefined();
    });

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
        }).toThrow('typecheck(...) params expected Types.string not Types.string()');
    });

    it('throws error because Types.dateString({}) does not exist', () => {
        expect(() => {
            typecheck(
                {
                    wrong: Types.dateString({})
                },
                []
            );
        }).toThrow('typecheck(...) params expected Types.dateString not Types.dateString()');
    });

    it('throws error because wrong param is undefined, Types.wrong does not exist', () => {
        expect(() => {
            typecheck(
                {
                    opts: Types.object({
                        wrong: Types.wrong
                    })
                },
                [{}]
            );
        }).toThrow(
            'typecheck(...) param opts.wrong expected a valid type of Types but received undefined.'
        );
    });

    it('throws error because wrong param is null and input is {}', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        wrong: null
                    })
                },
                [{}]
            );
        }).toThrow(
            'typecheck(...) param options.wrong expected a valid type of Types but received null.'
        );
    });

    it('throws error because wrong param is {} and input is {}', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        wrong: {}
                    })
                },
                [{}]
            );
        }).toThrow(
            'typecheck(...) param options.wrong expected a valid type of Types but received an Object: {}.'
        );
    });
});
