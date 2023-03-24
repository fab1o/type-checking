import { Types, typecheck } from '../../src';

describe('Types.dateString', () => {
    it('type name to be correct', () => {
        expect(Types.dateString.typeName).toBe('dateString');
    });

    it('type name of extented functions to be correct', () => {
        expect(Types.dateString.optional.typeName).toBe('dateString');
    });

    it('type name of logging functions to be correct', () => {
        expect(Types.dateString.warn.typeName).toBe('dateString');
    });

    it('throw an error', () => {
        expect(() => {
            typecheck(
                {
                    date: Types.dateString
                },
                [null]
            );
        }).toThrow('{date} date expected a String in ISO date format but received null.');
    });

    it('expect to not throw an Error', () => {
        expect(() => {
            typecheck(
                {
                    date: Types.dateString
                },
                ['2020-05-18T00:00:00-00:00']
            );
            typecheck(
                {
                    date: Types.dateString
                },
                ['2020-05-18T00:00:00Z']
            );
            typecheck(
                {
                    date: Types.dateString
                },
                ['2020-05-18T00:00:00.000Z']
            );
            typecheck(
                {
                    date: Types.dateString
                },
                ['2020-05-18']
            );
        }).not.toThrow();
    });
});
