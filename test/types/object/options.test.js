import { Types, typecheck } from '../../../src';

describe('Types.object as options', () => {
    it('throw an error', () => {
        expect(() => {
            function setName() {
                const params = {
                    opts: Types.object({
                        name: Types.string
                    })
                };

                typecheck(setName, params, arguments);
            }
            setName();
        }).toThrow('setName(opts) opts expected an Object but received undefined.');
    });

    it('throw an error for params in the options', () => {
        expect(() => {
            function setName() {
                const params = {
                    opts: Types.object({
                        name: Types.string,
                        year: Types.number
                    })
                };

                typecheck(setName, params, arguments);
            }
            setName({
                name: null
            });
        }).toThrow('setName({name, year}) opts.name expected a String but received null.');
    });

    it('throw an error when a param of the object is wrong', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string
                    })
                },
                [{ name: null }]
            );
        }).toThrow('{{name}} options.name expected a String but received null.');
    });

    it('should not fail when options is optional', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string
                    }).optional
                },
                []
            );
        }).not.toThrow();
    });

    it('should not fail when input order is different', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string,
                        year: Types.number,
                        active: Types.boolean
                    })
                },
                [
                    {
                        active: true,
                        name: '',
                        year: 2020
                    }
                ]
            );
        }).not.toThrow();
    });

    it('should not fail when input is empty object and all params inside options are optional', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string.optional
                    })
                },
                [{}]
            );
        }).not.toThrow();
    });

    it('should not fail when input is empty object and all params are optional', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string.optional
                    }).optional
                },
                [{}]
            );
        }).not.toThrow();
    });

    it('fails when input is empty object and one param is not optional', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string
                    }).optional
                },
                [{}]
            );
        }).toThrow('{{name}} options.name expected a String but received undefined.');
    });

    it('should not fail when a param is length', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        length: Types.number
                    })
                },
                [
                    {
                        length: 123
                    }
                ]
            );
        }).not.toThrow();
    });
});
