import { Types, typecheck } from '../../../src';

describe('Types.object', () => {
    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.object()
                },
                []
            );
        }).toThrow('{obj} obj expected an Object but received undefined.');
    });

    it('not throw an error', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.object()
                },
                [{}]
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when object is optional.', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.object().optional
                },
                []
            );
        }).not.toThrow();
    });

    it('an Error is not thrown when object is nullable.', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.object().nullable
                },
                [null]
            );
        }).not.toThrow();
    });

    it('throw an error when nested and missing argument of the same parent name', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.object({
                        name: Types.string,
                        obj: Types.object()
                    })
                },
                [{ name: '' }]
            );
        }).toThrow('{{ name, obj }} obj.obj expected an Object but received undefined.');
    });

    it('not throw an error when nested and not missing required arguments', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.object({
                        name: Types.string,
                        innerObj: Types.object().optional
                    })
                },
                [{ name: '' }]
            );
        }).not.toThrow();
    });

    it('not throw an error when nested', () => {
        expect(() => {
            typecheck(
                {
                    obj: Types.object({
                        innerObj: Types.object().optional
                    })
                },
                [
                    {
                        innerObj: null
                    }
                ]
            );
        }).not.toThrow();
    });

    it('should not throw an Error', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string.optional,
                        year: Types.number.optional,
                        isActive: Types.boolean.optional
                    })
                },
                [{}]
            );
        }).not.toThrow();
    });

    it('should throw an Error when 1 property is required', () => {
        expect(() => {
            typecheck(
                {
                    options: Types.object({
                        name: Types.string.optional,
                        year: Types.number,
                        isActive: Types.boolean.optional
                    })
                },
                [{}]
            );
        }).toThrow(
            '{{ name, year, isActive }} options.year expected a Number but received undefined.'
        );
    });
});
